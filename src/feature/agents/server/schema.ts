import { z } from "zod";

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  instructions: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AgentType = z.infer<typeof AgentSchema>;

export const CreateAgentSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  instructions: z.string({
    required_error: "Instructions are required",
  }),
});

export type CreateAgentType = z.infer<typeof CreateAgentSchema>;
