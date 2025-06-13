import { agentsRouter } from "@/feature/agents/server/producers";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
