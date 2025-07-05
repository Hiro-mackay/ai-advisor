import { AgentAvatar } from "@/components/avatar/agent";
import { Button } from "@/components/ui/button";
import { AgentType } from "../../server/schema/query";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

export const AgentColumns: ColumnDef<AgentType>[] = [
  {
    header: "Agent",
    size: 200,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <AgentAvatar agent={row.original} size={32} />
            <div className="flex flex-col">
              <p className="font-semibold capitalize">{row.original.name}</p>
            </div>
          </div>
          <div className="flex gap-1 items-center pl-1">
            <CornerDownRightIcon className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.instructions}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: "meeting",
    cell: () => {
      return (
        <Button variant="outline">
          <VideoIcon className="size-4" />
          <p className="text-sm">Meeting</p>
        </Button>
      );
    },
  },
];
