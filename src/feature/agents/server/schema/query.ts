import { QueryInputSchema, QuerySchema } from "@/lib/schema";
import { z } from "zod";

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  instructions: z.string(),
  meetingCount: z.number().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type AgentType = z.infer<typeof AgentSchema>;

export const AgentsQueryInputSchema = QueryInputSchema;

export type AgentsQueryInputType = z.infer<typeof AgentsQueryInputSchema>;

export const AgentsQuerySchema = QuerySchema.extend({
  agents: z.array(AgentSchema),
});

export type AgentsQueryType = z.infer<typeof AgentsQuerySchema>;
