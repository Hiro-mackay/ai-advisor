import { Pagination } from "@/components/pagination";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/query-params";
import { useAgentsFilter } from "../hooks/use-agents-filter";
import { AgentsQueryType } from "../server/schema/query";

type Props = {
  data: AgentsQueryType;
};

export function AgentsPagination({ data }: Props) {
  const [filters, setFilters] = useAgentsFilter();

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
