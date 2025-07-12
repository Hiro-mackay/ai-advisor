import { MeetingType } from "@/feature/meetings/servers/schema/query";
import { useCallClient } from "../../hooks/use-call-client";
import { LoaderCircleIcon } from "lucide-react";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { PropsWithChildren } from "react";

type Props = {
  meeting: MeetingType;
};

export function CallProvider({ meeting, children }: PropsWithChildren<Props>) {
  const { status, callClient, call } = useCallClient(meeting.id);

  if (status !== "loaded")
    return (
      <div className="w-full h-full flex justify-center items-center gap-2 text-white">
        <LoaderCircleIcon className="size-6 animate-spin" />
        <p className="text-sm text-muted-foreground">Meeting Loading...</p>
      </div>
    );

  return (
    <StreamVideo client={callClient}>
      <StreamCall call={call}>{children}</StreamCall>
    </StreamVideo>
  );
}
