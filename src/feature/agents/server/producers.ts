import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createAgentSchema } from "../schema";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  create: protectedProcedure
    .input(createAgentSchema)
    .mutation(async ({ input, ctx }) => {
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
