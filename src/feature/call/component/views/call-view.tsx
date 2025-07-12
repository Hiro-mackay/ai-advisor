"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../ui/call-provider";
import { CallRoom } from "../ui/call-room";

type Props = {
  meetingId: string;
};

export function CallView({ meetingId }: Props) {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getById.queryOptions({
      id: meetingId,
    })
  );

  return (
    <CallProvider meeting={data}>
      <CallRoom meeting={data} />
    </CallProvider>
  );
}
