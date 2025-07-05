"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function MeetingsListHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">My Meetings</h2>

      <Button>
        <PlusIcon className="w-4 h-4" />
        New Meeting
      </Button>
    </div>
  );
}
