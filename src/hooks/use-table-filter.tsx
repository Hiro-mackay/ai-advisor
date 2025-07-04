import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/query-params";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useTableFilter(
  defaultPage: number = DEFAULT_PAGE,
  defaultLimit: number = DEFAULT_LIMIT
) {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger.withDefault(defaultPage).withOptions({
      clearOnDefault: true,
    }),
    limit: parseAsInteger.withDefault(defaultLimit).withOptions({
      clearOnDefault: true,
    }),
  });
}
