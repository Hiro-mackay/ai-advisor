import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/query-params";
import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
  UseQueryStatesKeysMap,
  UseQueryStatesReturn,
} from "nuqs";

type DefaultValues = {
  search?: string;
  page?: number;
  limit?: number;
};

export function useSearchFilter<T extends UseQueryStatesKeysMap>(
  keys?: T,
  defaultValues?: DefaultValues
) {
  const queryStates = {
    search: parseAsString.withDefault(defaultValues?.search ?? "").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger
      .withDefault(defaultValues?.page ?? DEFAULT_PAGE)
      .withOptions({
        clearOnDefault: true,
      }),
    limit: parseAsInteger
      .withDefault(defaultValues?.limit ?? DEFAULT_LIMIT)
      .withOptions({
        clearOnDefault: true,
      }),
    ...keys,
  };

  return useQueryStates(queryStates) as UseQueryStatesReturn<
    UseQueryStatesKeysMap<DefaultValues> & T
  >;
}
