import { MeetingType } from "@/feature/meetings/servers/schema/query";
import { CallWaitingRoom } from "@/feature/call/component/ui/call-waiting-room";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallCompleteCard } from "./call-complete-card";
import { CallActiveRoom } from "./call-active-room";

import "@stream-io/video-react-sdk/dist/css/styles.css";

type Props = {
  meeting: MeetingType;
};

export function CallRoom({ meeting }: Props) {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const onJoin = async () => {
    call?.join().then(() => {
      setShow("call");
    });
  };

  const onLeave = async () => {
    call?.endCall().then(() => {
      setShow("ended");
    });
  };

  return (
    <StreamTheme className="w-full h-full flex justify-center items-center">
      {show === "lobby" && (
        <CallWaitingRoom meeting={meeting} onJoin={onJoin} />
      )}
      {show === "call" && (
        <CallActiveRoom meeting={meeting} onLeave={onLeave} />
      )}
      {show === "ended" && <CallCompleteCard />}
    </StreamTheme>
  );
}
