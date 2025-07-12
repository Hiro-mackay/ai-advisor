import { MeetingType } from "@/feature/meetings/servers/schema/query";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

type Props = {
  meeting: MeetingType;
  onLeave: () => void;
};

export function CallActiveRoom({ meeting, onLeave }: Props) {
  return (
    <div className="flex flex-col w-full h-full gap-4 p-4">
      <div className="p-2 rounded-lg bg-slate-800">
        <h2>{meeting.agent.name}</h2>
      </div>
      <SpeakerLayout />
      <div className="flex justify-center items-center gap-2">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
}
