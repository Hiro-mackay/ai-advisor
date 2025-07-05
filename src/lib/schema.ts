import { z } from "zod";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "./query-params";

export const QueryInputSchema = z.object({
  page: z.number().positive().default(DEFAULT_PAGE),
  limit: z.number().positive().lte(MAX_LIMIT).default(DEFAULT_LIMIT),
  search: z.string().nullish(),
});

export type QueryInputType = z.infer<typeof QueryInputSchema>;

export const QuerySchema = z.object({
  page: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  totalPages: z.number(),
});

export type QueryType = z.infer<typeof QuerySchema>;
