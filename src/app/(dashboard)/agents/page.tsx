import { ErrorState } from "@/components/component-state/error";
import { LoadingState } from "@/components/component-state/loading";

import { AgentsListHeader } from "@/feature/agents/components/agents-list-header";
import { AgentsView } from "@/feature/agents/components/agents-view";
import { loadAgentsSearchParams } from "@/feature/agents/params";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const filters = await loadAgentsSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getAll.queryOptions(filters));

  return (
    <div className="px-4 flex-1 flex flex-col gap-4">
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState type="table" />}>
          <ErrorBoundary fallbackRender={ErrorState}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
