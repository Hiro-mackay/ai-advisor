import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/query-params";
import { MeetingsQueryType } from "../servers/schema/query";

import { Pagination } from "@/components/pagination";
import { useTableFilter } from "@/hooks/use-table-filter";

type Props = {
  data: MeetingsQueryType;
};

export function MeetingsPagination({ data }: Props) {
  const [filters, setFilters] = useTableFilter();

  return (
    <Pagination
      page={filters.page || DEFAULT_PAGE}
      limit={filters.limit || DEFAULT_LIMIT}
      totalPages={data.totalPages}
      hasNextPage={data.hasNextPage}
      hasPreviousPage={data.hasPreviousPage}
      changePage={(page) => setFilters((prev) => ({ ...prev, page }))}
      changeLimit={(limit) =>
        setFilters((prev) => ({ ...prev, limit, page: DEFAULT_PAGE }))
      }
    />
  );
}
