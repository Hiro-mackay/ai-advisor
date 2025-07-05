import { ColumnDef } from "@tanstack/react-table";
import { MeetingType } from "../../servers/schema/query";
import { AgentAvatar } from "@/components/avatar/agent";
import { cn, formatDuration } from "@/lib/utils";
import {
  ClockArrowUpIcon,
  LucideIcon,
  LoaderIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
  ClockFadingIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StatusIconMap: Record<MeetingType["status"], LucideIcon> = {
  upcoming: ClockArrowUpIcon,
  processing: LoaderIcon,
  active: PlayCircleIcon,
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
};

const StatusColorMap: Record<MeetingType["status"], string> = {
  upcoming: "text-slate-500 bg-slate-50 border-slate-200",
  processing: "text-amber-500 bg-amber-50 border-amber-200",
  active: "text-blue-500 bg-blue-50 border-blue-200",
  completed: "text-emerald-500 bg-emerald-50 border-emerald-200",
  cancelled: "text-rose-500 bg-rose-50 border-rose-200",
};

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
