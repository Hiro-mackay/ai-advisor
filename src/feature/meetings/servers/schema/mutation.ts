import { z } from "zod";

export const CreateMeetingSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  agentId: z.string({
    required_error: "Agent ID is required",
  }),
  description: z.string().nullish(),
  startAt: z.coerce.date().nullish(),
  endAt: z.coerce.date().nullish(),
  transcriptUrl: z.string().url().nullish(),
});

export type CreateMeetingType = z.infer<typeof CreateMeetingSchema>;

export const UpdateMeetingSchema = CreateMeetingSchema.extend({
  id: z.string({
    required_error: "ID is required",
  }),
  recordingUrl: z.string().url().nullish(),
  summary: z.string().nullish(),
});
