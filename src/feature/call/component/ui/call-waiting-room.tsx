import { Button } from "@/components/ui/button";
import { MeetingType } from "@/feature/meetings/servers/schema/query";
import { authClient } from "@/lib/auth/auth.client";
import { AVATAR_STYLES, generateAvatarUri } from "@/lib/avatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  VideoPreview,
  LoadingIndicator,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
} from "@stream-io/video-react-sdk";
import { CameraIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";

type Props = {
  meeting: MeetingType;
  onJoin: () => void;
};

export function CallWaitingRoom({ meeting, onJoin }: Props) {
  const isActive = meeting.status === "active";

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-xl gap-4">
      <h2 className="text-2xl font-bold">Join to {meeting.agent.name}</h2>
      <div className="w-full h-96 bg-slate-800 rounded-lg flex justify-center items-center relative">
        <VideoPreview
          DisabledVideoPreview={DisabledVideoPreview}
          NoCameraPreview={NoCameraPreview}
          StartingCameraPreview={StartingCameraPreview}
        />
        <div className="absolute bottom-4 flex justify-center">
          <ToggleAudioPreviewButton />
          <ToggleVideoPreviewButton />
        </div>
      </div>

      <div className="flex items-center justify-center p-4 gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          disabled={!isActive}
          onClick={onJoin}
        >
          Join Call
        </Button>
        <Button size="icon" className="bg-slate-700 hover:bg-slate-600">
          <Link href={`/meetings/${meeting.id}`}>
            <Undo2Icon />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DisabledVideoPreview() {
  const { data: auth } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: auth?.user.name ?? "Unknown",
          image:
            auth?.user.image ??
            generateAvatarUri({
              style: AVATAR_STYLES["user"],
              seed: auth?.user.name ?? "Unknown",
            }),
        } as StreamVideoParticipant
      }
    />
  );
}

const NoCameraPreview = () => (
  <div>
    <CameraIcon />
  </div>
);
const StartingCameraPreview = () => (
  <div>
    <LoadingIndicator />
  </div>
);
