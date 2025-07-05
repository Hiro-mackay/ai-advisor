import { z } from "zod";

export const CreateMeetingSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  agentId: z.string({
    required_error: "Agent ID is required",
  }),
  description: z.string().optional(),
});

export type CreateMeetingType = z.infer<typeof CreateMeetingSchema>;
