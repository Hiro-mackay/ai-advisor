"use client";

import { EmptyState } from "@/components/component-state/empty";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentColumns } from "./columns";

export function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getAll.queryOptions());

  return (
    <>
      {data.length === 0 ? (
        <Card>
          <EmptyState
            title="No agents found"
            description="Create a new agent to get started"
          />
        </Card>
      ) : (
        <DataTable
          columns={AgentColumns}
          data={data}
          options={{ headerState: "hidden" }}
        />
      )}
    </>
  );
}
