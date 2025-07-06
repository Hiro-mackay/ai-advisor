import { SearchFilterInput } from "@/components/search-params/search-filter-input";
import { SearchFilterSelect } from "@/components/search-params/search-filter-select";
import { useMeetingsSearchFilter } from "@/feature/meetings/hooks/use-meetings-search-filter";
import { MeetingType } from "../../servers/schema/query";
import { meetingsStatus } from "@/db/schema";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { StatusColorMap, StatusIconMap } from "../../utils/meeting-status";
import { AgentAvatar } from "@/components/avatar/agent";

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

  const statusOptions = meetingsStatus.enumValues.map((status) => {
    const Icon = StatusIconMap[status];
    return {
      label: (
        <div className="flex items-center gap-2">
          <Icon className={StatusColorMap[status]} />
          <span>{status}</span>
        </div>
      ),
      value: status,
    };
  });

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      status: value as MeetingType["status"],
    }));
  };

  const agentOptions =
    data?.agents.map((agent) => ({
      label: (
        <div className="flex items-center gap-2">
          <AgentAvatar agent={agent} size={20} />
          <p className="truncate">{agent.name}</p>
        </div>
      ),
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
        className="w-[200px]"
        placeholder="Status filter"
        defaultValue={filters.status ?? undefined}
        options={statusOptions}
        onChange={handleStatusChange}
      />
      <SearchFilterSelect
        placeholder="Agent filter"
        className="w-[200px]"
        defaultValue={filters.agentId ?? undefined}
        options={agentOptions}
        onChange={handleAgentChange}
      />
    </div>
  );
}
