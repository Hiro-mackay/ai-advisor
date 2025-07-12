import { ErrorState } from "@/components/component-state/error";
import { CallView } from "@/feature/call/component/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = PropsWithChildren & {
  params: Promise<{ meetingId: string }>;
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallbackRender={ErrorState}>
        <CallView meetingId={meetingId} />
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
