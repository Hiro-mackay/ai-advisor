import { useSearchFilter } from "@/hooks/use-search-filter";
import { parseAsString } from "nuqs";

export function useMeetingsSearchFilter() {
  return useSearchFilter({
    agentId: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    status: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  });
}
