import { Loading } from "@/components/progress/loading";
import { AgentsListHeader } from "@/feature/agents/components/agents-list-header";
import { AgentsView } from "@/feature/agents/components/agents-view";
import { AgentsErrorState } from "@/feature/agents/components/error-state";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getAll.queryOptions());

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Loading title="Loading agents" />}>
          <ErrorBoundary fallback={<AgentsErrorState />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
