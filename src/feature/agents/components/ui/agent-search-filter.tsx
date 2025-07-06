import { SearchFilterInput } from "@/components/search-params/search-filter-input";
import { useAgentsSearchFilter } from "@/feature/agents/hooks/use-agents-search-filter";

export function AgentSearchFilter() {
  const [filters, setFilters] = useAgentsSearchFilter();

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  return (
    <SearchFilterInput defaultValue={filters.search} onChange={handleSearch} />
  );
}
