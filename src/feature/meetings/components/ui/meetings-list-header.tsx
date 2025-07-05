"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import { NewMeetingDialog } from "./new-meeting-dialog";

export function MeetingsListHeader() {
  const { open, onOpen, onClose } = useDialog();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Meetings</h2>

        <Button onClick={onOpen}>
          <PlusIcon className="w-4 h-4" />
          New Meeting
        </Button>
      </div>

      <NewMeetingDialog open={open} onClose={onClose} />
    </>
  );
}
