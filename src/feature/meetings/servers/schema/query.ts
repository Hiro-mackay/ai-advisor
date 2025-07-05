import { meetingsStatus } from "@/db/schema";
import { QueryInputSchema, QuerySchema } from "@/lib/schema";
import { z } from "zod";
import { AgentSchema } from "@/feature/agents/server/schema/query";

export const MeetingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.enum(meetingsStatus.enumValues),
  startAt: z.coerce.date().nullish(),
  endAt: z.coerce.date().nullish(),
  transcriptUrl: z.string().url().nullish(),
  recordingUrl: z.string().url().nullish(),
  summary: z.string().nullish(),
  duration: z.number().default(0),
  agent: AgentSchema.omit({ meetingCount: true }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type MeetingType = z.infer<typeof MeetingSchema>;

export const MeetingsQueryInputSchema = QueryInputSchema.extend({
  agentId: z.string().nullish(),
  status: z.enum(meetingsStatus.enumValues).nullish(),
});

export type MeetingsQueryInputType = z.infer<typeof MeetingsQueryInputSchema>;

export const MeetingsQuerySchema = QuerySchema.extend({
  meetings: z.array(MeetingSchema),
});

export type MeetingsQueryType = z.infer<typeof MeetingsQuerySchema>;
