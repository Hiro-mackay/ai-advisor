import { ColumnDef } from "@tanstack/react-table";
import { MeetingType } from "../../servers/schema/query";
import { AgentAvatar } from "@/components/avatar/agent";
import { cn, formatDuration } from "@/lib/utils";
import { ClockFadingIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusIconMap, StatusColorMap } from "../../utils/meeting-status";

export const MeetingColumns: ColumnDef<MeetingType>[] = [
  {
    header: "Meeting Title",
    accessorKey: "title",
  },
  {
    header: "Agent",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <AgentAvatar agent={row.original.agent} />
          {row.original.agent?.name}
        </div>
      );
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const Icon = StatusIconMap[row.original.status];
      return (
        <Badge
          className={cn("capitalize", StatusColorMap[row.original.status])}
          variant="outline"
        >
          <Icon />
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    header: "Duration",
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          <ClockFadingIcon className="text-violet-500" />
          {row.original.status === "completed" ? (
            formatDuration(row.original.duration)
          ) : (
            <span className="text-slate-500">No duration</span>
          )}
        </Badge>
      );
    },
  },
];
