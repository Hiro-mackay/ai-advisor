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
