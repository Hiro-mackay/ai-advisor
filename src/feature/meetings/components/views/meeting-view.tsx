"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MeetingHeader } from "../ui/meeting-header";
import { useDialog } from "@/hooks/use-dialog";
import { UpdateMeetingDialog } from "../ui/update-meeting-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RemoveMeetingDialog } from "../ui/remove-meeting-dialog";
import { VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { AgentAvatar } from "@/components/avatar/agent";
import { cn, formatDuration } from "@/lib/utils";
import { StatusColorMap, StatusIconMap } from "../../utils/meeting-status";
import { Badge } from "@/components/ui/badge";

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

  const Icon = StatusIconMap[data.status];

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
        <CardHeader className="flex justify-between items-center gap-2">
          <CardTitle>
            <h2 className="text-lg font-medium">{data.title}</h2>
            <p className="text-sm text-muted-foreground">ID:{data.id}</p>
          </CardTitle>

          <div>
            <Button asChild>
              <Link href={`/call/${data.id}`}>
                <VideoIcon className="size-4 text-blue-500" />
                <span>Go to Call</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-20 flex-wrap">
            <div className="flex flex-col gap-3">
              <Label className="font-medium">Status:</Label>
              <Badge
                className={cn("capitalize", StatusColorMap[data.status])}
                variant="outline"
              >
                <Icon />
                {data.status}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-medium">Agent:</Label>
              <div className="flex items-center gap-2">
                <AgentAvatar agent={data.agent} size={24} />
                <p className="text-sm text-muted-foreground">
                  {data.agent.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="font-medium">Created At:</Label>
              <p className="text-sm text-muted-foreground">
                {data.createdAt.toLocaleDateString("ja-JP")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="font-medium">Duration:</Label>
              <p className="text-sm text-muted-foreground">
                {formatDuration(data.duration)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
