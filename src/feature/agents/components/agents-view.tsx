"use client";

import { EmptyState } from "@/components/component-state/empty";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAgentsFilter } from "../hooks/use-agents-filter";
import { AgentsPagination } from "./agents-pagination";
import { AgentColumns } from "./columns";
import { useRouter } from "next/navigation";

export function AgentsView() {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters] = useAgentsFilter();
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
