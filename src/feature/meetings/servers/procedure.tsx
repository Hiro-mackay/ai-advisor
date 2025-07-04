import { db } from "@/db";
import { meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";
import {
  MeetingType,
  MeetingsQueryInputSchema,
  MeetingsQueryType,
} from "./schema/query";

export const meetingsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(MeetingsQueryInputSchema)
    .query<MeetingsQueryType>(async ({ ctx, input }) => {
      const { page, limit, search } = input;

      const data = await db
        .select()
        .from(meetings)
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
    .query<MeetingType>(async ({ input }) => {
      const { id } = input;

      const data = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, id))
        .limit(1);

      return data[0];
    }),
});
