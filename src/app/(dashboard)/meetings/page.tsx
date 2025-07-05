import { ErrorState } from "@/components/component-state/error";
import { LoadingState } from "@/components/component-state/loading";

import { MeetingsView } from "@/feature/meetings/components/views/meetings-view";
import { MeetingsListHeader } from "@/feature/meetings/components/ui/meetings-list-header";
import { loadFilterSearchParams } from "@/lib/query-params";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const filters = await loadFilterSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getAll.queryOptions(filters));

  return (
    <div className="px-4 flex-1 flex flex-col gap-4">
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState type="table" />}>
          <ErrorBoundary fallbackRender={ErrorState}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
