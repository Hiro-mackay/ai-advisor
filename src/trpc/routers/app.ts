import { agentsRouter } from "@/feature/agents/server/producers";
import { meetingsRouter } from "@/feature/meetings/servers/procedure";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
