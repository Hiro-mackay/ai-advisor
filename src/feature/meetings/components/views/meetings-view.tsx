"use client";

import { EmptyState } from "@/components/component-state/empty";
import { Card } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { useTableFilter } from "@/hooks/use-table-filter";
import { MeetingColumns } from "./ui/columns";
import { MeetingsPagination } from "./ui/meetings-pagination";

export function MeetingsView() {
  const trpc = useTRPC();
  const [filters] = useTableFilter();
  const { data } = useSuspenseQuery(trpc.meetings.getAll.queryOptions(filters));

  return (
    <>
      {data.meetings.length === 0 ? (
        <Card>
          <EmptyState
            title="No meetings found"
            description="Create a new meeting to get started"
          />
        </Card>
      ) : (
        <>
          <DataTable
            columns={MeetingColumns}
            data={data.meetings}
            options={{ headerState: "hidden" }}
          />

          <MeetingsPagination data={data} />
        </>
      )}
    </>
  );
}
