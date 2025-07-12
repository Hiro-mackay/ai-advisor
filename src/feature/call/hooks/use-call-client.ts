import { authClient } from "@/lib/auth/auth.client";
import { env } from "@/lib/env";
import { useTRPC } from "@/trpc/client";
import {
  Call,
  CallingState,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type ReturnType =
  | {
      status: "unload" | "loading";
      callClient: undefined;
      call: undefined;
    }
  | {
      status: "loaded";
      callClient: StreamVideoClient;
      call: Call;
    };

export function useCallClient(meetingId: string): ReturnType {
  const trpc = useTRPC();
  const { data: auth } = authClient.useSession();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateStreamToken.mutationOptions()
  );

  const [callClient, setCallClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const [status, setStatus] = useState<"unload" | "loading" | "loaded">(
    "unload"
  );

  useEffect(() => {
    setStatus("loading");

    if (!callClient && auth) {
      const client = new StreamVideoClient({
        apiKey: env.NEXT_PUBLIC_STREAM_API_KEY,
        user: {
          id: auth.user.id,
          name: auth.user.name,
          image: auth.user.image ?? undefined,
        },
        tokenProvider: generateToken,
      });
      setCallClient(client);

      const c = client.call("default", meetingId);
      c.camera.disable();
      c.microphone.disable();
      setCall(c);

      setStatus("loaded");

      return () => {
        client.disconnectUser();
        setCallClient(undefined);

        if (c.state.callingState !== CallingState.LEFT) {
          c.leave();
          c.endCall();
          setCall(undefined);
        }

        setStatus("unload");
      };
    }
  }, [auth?.user, meetingId]);

  if (status === "loaded" && callClient && call) {
    return {
      status,
      callClient,
      call,
    };
  }

  return {
    status: status as "unload" | "loading",
    callClient: undefined,
    call: undefined,
  };
}
