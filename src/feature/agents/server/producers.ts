import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from "zod";
import { CreateAgentSchema } from "./schema/mutation";
import { AgentType } from "./schema/query";

export const agentsRouter = createTRPCRouter({
  getAll: protectedProcedure.query<AgentType[]>(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query<AgentType>(async ({ input }) => {
      const [data] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
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
