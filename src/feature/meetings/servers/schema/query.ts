import { meetingsStatus } from "@/db/schema";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "@/lib/query-params";
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
  agent: AgentSchema.omit({ meetingCount: true }).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type MeetingType = z.infer<typeof MeetingSchema>;

export const MeetingsQueryInputSchema = z.object({
  page: z.number().positive().default(DEFAULT_PAGE),
  limit: z.number().positive().lte(MAX_LIMIT).default(DEFAULT_LIMIT),
  search: z.string().optional(),
});

export type MeetingsQueryInputType = z.infer<typeof MeetingsQueryInputSchema>;

export const MeetingsQuerySchema = z.object({
  meetings: z.array(MeetingSchema),
  page: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  totalPages: z.number(),
});

export type MeetingsQueryType = z.infer<typeof MeetingsQuerySchema>;
