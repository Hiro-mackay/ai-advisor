"use client";

import { EmptyState } from "@/components/component-state/empty";
import { Card } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { MeetingColumns } from "../ui/columns";
import { MeetingsPagination } from "../ui/meetings-pagination";
import { useMeetingsSearchFilter } from "../../hooks/use-meetings-search-filter";
import { MeetingType } from "../../servers/schema/query";
import { MeetingSearchFilter } from "../ui/meeting-search-filter";

export function MeetingsView() {
  const trpc = useTRPC();
  const [filters] = useMeetingsSearchFilter();

  const { data } = useSuspenseQuery(
    trpc.meetings.getAll.queryOptions({
      ...filters,
      status: (filters.status as MeetingType["status"]) || undefined,
    })
  );

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
          <MeetingSearchFilter />

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
