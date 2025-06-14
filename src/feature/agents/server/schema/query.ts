import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  MIN_LIMIT,
} from "@/lib/query-params";
import { z } from "zod";

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  instructions: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AgentType = z.infer<typeof AgentSchema>;

export const AgentsQueryInputSchema = z.object({
  page: z.number().min(MIN_LIMIT).default(DEFAULT_PAGE),
  limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  search: z.string().optional(),
});

export type AgentsQueryInputType = z.infer<typeof AgentsQueryInputSchema>;

export const AgentsQuerySchema = z.object({
  agents: z.array(AgentSchema),
  page: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  totalPages: z.number(),
});

export type AgentsQueryType = z.infer<typeof AgentsQuerySchema>;
