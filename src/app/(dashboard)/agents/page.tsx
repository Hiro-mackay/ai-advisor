import { ErrorState } from "@/components/component-state/error";
import { LoadingState } from "@/components/component-state/loading";

import { AgentsListHeader } from "@/feature/agents/components/agents-list-header";
import { AgentsView } from "@/feature/agents/components/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getAll.queryOptions());

  return (
    <div className="px-4">
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
