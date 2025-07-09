"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MeetingHeader } from "../ui/meeting-header";
import { useDialog } from "@/hooks/use-dialog";
import { UpdateMeetingDialog } from "../ui/update-meeting-dialog";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RemoveMeetingDialog } from "../ui/remove-meeting-dialog";

type Props = {
  meetingId: string;
};

export function MeetingView({ meetingId }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getById.queryOptions({
      id: meetingId,
    })
  );

  const {
    open: openUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDialog();

  const {
    open: openRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDialog();

  return (
    <div>
      <MeetingHeader
        meetingName={data.title}
        onEdit={onOpenUpdate}
        onRemove={onOpenRemove}
      />
      <UpdateMeetingDialog
        meeting={data}
        open={openUpdate}
        onCancel={onCloseUpdate}
      />
      <RemoveMeetingDialog
        meeting={data}
        open={openRemove}
        onCancel={onCloseRemove}
      />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Meeting Details</CardTitle>
          <CardDescription>Meeting Details</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
