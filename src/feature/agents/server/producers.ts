import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import z from "zod";
import { CreateAgentSchema } from "./schema/mutation";
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
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.session.userId),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
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
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.id, input.id),
            eq(agents.userId, ctx.auth.session.userId)
          )
        );
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
        .returning();

      return data;
    }),
});
