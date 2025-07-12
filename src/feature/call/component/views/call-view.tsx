"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallCompleteCard } from "../ui/call-complete-card";
import { CallWaitingRoom } from "../ui/call-waiting-room";
import { MeetingType } from "@/feature/meetings/servers/schema/query";
import { CallProvider } from "../ui/call-provider";

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
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-xl">
          <ViewerSelector meeting={data} />
        </div>
      </div>
    </CallProvider>
  );
}

function ViewerSelector({ meeting }: { meeting: MeetingType }) {
  switch (meeting.status) {
    case "processing":
    case "upcoming":
    case "active":
      return <CallWaitingRoom meeting={meeting} onJoin={() => {}} />;

    case "completed":
      return <CallCompleteCard />;

    default:
      return null;
  }
}
