import { meetingsStatus } from "@/db/schema";
import { useSearchFilter } from "@/hooks/use-search-filter";
import { parseAsString, parseAsStringEnum } from "nuqs";

export function useMeetingsSearchFilter() {
  return useSearchFilter({
    agentId: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    status: parseAsStringEnum(meetingsStatus.enumValues).withOptions({
      clearOnDefault: true,
    }),
  });
}
