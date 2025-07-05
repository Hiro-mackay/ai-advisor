import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import {
  MeetingType,
  MeetingsQueryInputSchema,
  MeetingsQueryType,
} from "./schema/query";
import { CreateMeetingSchema, UpdateMeetingSchema } from "./schema/mutation";

export const meetingsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(MeetingsQueryInputSchema)
    .query<MeetingsQueryType>(async ({ ctx, input }) => {
      const { page, limit, search } = input;

      const data = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          // seconds duration
          duration: sql<number>`EXTRACT(EPOCH FROM (end_at - start_at))`.as(
            "duration"
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.session.userId),
            search ? ilike(meetings.title, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt))
        .limit(limit)
        .offset((page - 1) * limit);

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.session.userId),
            search ? ilike(meetings.title, `%${search}%`) : undefined
          )
        );

      const totalPages = Math.ceil(total.count / limit);

      const hasNextPage = page * limit < total.count;
      const hasPreviousPage = page > 1;

      return {
        meetings: data,
        page,
        limit,
        hasNextPage,
        hasPreviousPage,
        totalPages,
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query<MeetingType>(async ({ ctx, input }) => {
      const { id } = input;

      const [data] = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          // seconds duration
          duration: sql<number>`EXTRACT(EPOCH FROM (end_at - start_at))`.as(
            "duration"
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(eq(meetings.userId, ctx.auth.session.userId), eq(meetings.id, id))
        )
        .limit(1);

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }

      return data;
    }),

  create: protectedProcedure
    .input(CreateMeetingSchema)
    .mutation<MeetingType>(async ({ ctx, input }) => {
      const { title, description, agentId } = input;

      const [data] = await db
        .insert(meetings)
        .values({
          title,
          description,
          agentId,
          userId: ctx.auth.session.userId,
        })
        .returning();

      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, agentId));

      // TODO: create meeting stream

      return { ...data, duration: 0, agent };
    }),

  update: protectedProcedure
    .input(UpdateMeetingSchema)
    .mutation<MeetingType>(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const [updated] = await db
        .update(meetings)
        .set(data)
        .where(
          and(eq(meetings.userId, ctx.auth.session.userId), eq(meetings.id, id))
        )
        .returning({
          ...getTableColumns(meetings),
          duration: sql<number>`EXTRACT(EPOCH FROM (end_at - start_at))`.as(
            "duration"
          ),
        });

      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, updated.agentId));

      return { ...updated, agent };
    }),
});
