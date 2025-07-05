import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import z from "zod";
import {
  CreateAgentSchema,
  RemoveAgentSchema,
  UpdateAgentSchema,
} from "./schema/mutation";
import {
  AgentsQueryInputSchema,
  AgentsQueryType,
  AgentType,
} from "./schema/query";

export const agentsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(AgentsQueryInputSchema)
    .query<AgentsQueryType>(async ({ ctx, input }) => {
      const { page, limit, search } = input;

      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: count(meetings.id),
        })
        .from(agents)
        .leftJoin(meetings, eq(agents.id, meetings.agentId))
        .where(
          and(
            eq(agents.userId, ctx.auth.session.userId),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .groupBy(agents.id)
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(agents.updatedAt));

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(and(eq(agents.userId, ctx.auth.session.userId)));

      const totalPages = Math.ceil(total.count / limit);

      const hasNextPage = page * limit < total.count;
      const hasPreviousPage = page > 1;

      return {
        agents: data,
        page,
        limit,
        hasNextPage,
        hasPreviousPage,
        totalPages,
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query<AgentType>(async ({ input, ctx }) => {
      const [data] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: count(meetings.id),
        })
        .from(agents)
        .leftJoin(meetings, eq(agents.id, meetings.agentId))
        .where(
          and(
            eq(agents.id, input.id),
            eq(agents.userId, ctx.auth.session.userId)
          )
        )
        .groupBy(agents.id);
      return data;
    }),

  create: protectedProcedure
    .input(CreateAgentSchema)
    .mutation<AgentType>(async ({ input, ctx }) => {
      const [data] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.session.userId,
        })
        .returning({
          ...getTableColumns(agents),
        });

      return { ...data, meetingCount: 0 };
    }),

  remove: protectedProcedure
    .input(RemoveAgentSchema)
    .mutation<void>(async ({ input, ctx }) => {
      await db
        .delete(agents)
        .where(
          and(
            eq(agents.id, input.id),
            eq(agents.userId, ctx.auth.session.userId)
          )
        );
    }),

  update: protectedProcedure
    .input(UpdateAgentSchema)
    .mutation<AgentType>(async ({ input, ctx }) => {
      const [data] = await db
        .update(agents)
        .set(input)
        .where(
          and(
            eq(agents.id, input.id),
            eq(agents.userId, ctx.auth.session.userId)
          )
        )
        .returning({
          ...getTableColumns(agents),
        });

      const [{ count: meetingCount }] = await db
        .select({ count: count() })
        .from(meetings)
        .where(eq(meetings.agentId, input.id));

      return { ...data, meetingCount };
    }),
});
