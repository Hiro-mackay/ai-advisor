import { z } from "zod";

export const CreateAgentSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  instructions: z.string({
    required_error: "Instructions are required",
  }),
});

export type CreateAgentType = z.infer<typeof CreateAgentSchema>;

export const RemoveAgentSchema = z.object({
  id: z.string(),
});

export type RemoveAgentType = z.infer<typeof RemoveAgentSchema>;

export const UpdateAgentSchema = CreateAgentSchema.extend({
  id: z.string({
    required_error: "ID is required",
  }),
});

export type UpdateAgentType = z.infer<typeof UpdateAgentSchema>;
