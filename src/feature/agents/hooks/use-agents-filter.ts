import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/query-params";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useAgentsFilter() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
      clearOnDefault: true,
    }),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT).withOptions({
      clearOnDefault: true,
    }),
  });
}
