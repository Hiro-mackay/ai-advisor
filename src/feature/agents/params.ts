import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/query-params";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const agentsFilterSearchParams = {
  search: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
    clearOnDefault: true,
  }),
  limit: parseAsInteger.withDefault(DEFAULT_LIMIT).withOptions({
    clearOnDefault: true,
  }),
};

export const loadAgentsSearchParams = createLoader(agentsFilterSearchParams);
