import { ErrorState } from "@/components/component-state/error";
import { LoadingState } from "@/components/component-state/loading";
import { MeetingView } from "@/feature/meetings/components/views/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  params: Promise<{
    meetingId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getById.queryOptions({
      id: meetingId,
    })
  );

  return (
    <div className="px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState type="page" />}>
          <ErrorBoundary fallbackRender={ErrorState}>
            <MeetingView meetingId={meetingId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
