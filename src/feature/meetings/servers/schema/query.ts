import { meetingsStatus } from "@/db/schema";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MIN_LIMIT } from "@/lib/query-params";
import { MAX_LIMIT } from "@/lib/query-params";
import { z } from "zod";

export const MeetingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.enum(meetingsStatus.enumValues),
  startAt: z.date().nullish(),
  endAt: z.date().nullish(),
  transcriptUrl: z.string().nullish(),
  recordingUrl: z.string().nullish(),
  summary: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MeetingType = z.infer<typeof MeetingSchema>;

export const MeetingsQueryInputSchema = z.object({
  page: z.number().min(MIN_LIMIT).default(DEFAULT_PAGE),
  limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
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
