import { SearchFilterInput } from "@/components/search-params/search-filter-input";
import { SearchFilterSelect } from "@/components/search-params/search-filter-select";
import { useMeetingsSearchFilter } from "@/feature/meetings/hooks/use-meetings-search-filter";
import { MeetingType } from "../../servers/schema/query";
import { meetingsStatus } from "@/db/schema";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export function MeetingSearchFilter() {
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsSearchFilter();
  const { data } = useQuery(trpc.agents.getAll.queryOptions({}));

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const statusOptions = meetingsStatus.enumValues.map((status) => ({
    label: status,
    value: status,
  }));

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      status: value as MeetingType["status"],
    }));
  };

  const agentOptions =
    data?.agents.map((agent) => ({
      label: agent.name,
      value: agent.id,
    })) ?? [];

  const handleAgentChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      agentId: value,
    }));
  };

  return (
    <div className="flex gap-2">
      <SearchFilterInput
        defaultValue={filters.search}
        onChange={handleSearch}
      />
      <SearchFilterSelect
        className="w-[150px]"
        placeholder="Status filter"
        defaultValue={filters.status ?? undefined}
        options={statusOptions}
        onChange={handleStatusChange}
      />
      <SearchFilterSelect
        placeholder="Agent filter"
        className="w-[150px]"
        defaultValue={filters.agentId ?? undefined}
        options={agentOptions}
        onChange={handleAgentChange}
      />
    </div>
  );
}
