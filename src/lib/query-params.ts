import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;
export const MIN_LIMIT = 1;

export const filterSearchParams = {
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

export const loadFilterSearchParams = createLoader(filterSearchParams);
