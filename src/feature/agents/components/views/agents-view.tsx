"use client";

import { EmptyState } from "@/components/component-state/empty";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentsPagination } from "../ui/agents-pagination";
import { AgentColumns } from "../ui/columns";
import { useRouter } from "next/navigation";
import { useTableFilter } from "@/hooks/use-table-filter";
import { AgentSearchFilter } from "../ui/agent-search-filter";

export function AgentsView() {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters] = useTableFilter();
  const { data } = useSuspenseQuery(trpc.agents.getAll.queryOptions(filters));

  return (
    <>
      {data.agents.length === 0 ? (
        <Card>
          <EmptyState
            title="No agents found"
            description="Create a new agent to get started"
          />
        </Card>
      ) : (
        <>
          <AgentSearchFilter />

          <DataTable
            columns={AgentColumns}
            data={data.agents}
            options={{ headerState: "hidden" }}
            onRowClick={(row) => {
              router.push(`/agents/${row.id}`);
            }}
          />

          <AgentsPagination data={data} />
        </>
      )}
    </>
  );
}
