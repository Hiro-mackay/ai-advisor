import { ErrorState } from "@/components/component-state/error";
import { LoadingState } from "@/components/component-state/loading";
import { AgentView } from "@/feature/agents/components/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  params: Promise<{ agentId: string }>;
};

export default async function Page({ params }: Props) {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getById.queryOptions({
      id: agentId,
    })
  );

  return (
    <div className="px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState type="page" />}>
          <ErrorBoundary fallbackRender={ErrorState}>
            <AgentView agentId={agentId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
