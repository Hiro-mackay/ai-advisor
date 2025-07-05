import { LucideIcon } from "lucide-react";
import { MeetingType } from "../servers/schema/query";
import {
  ClockArrowUpIcon,
  LoaderIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

export const StatusIconMap: Record<MeetingType["status"], LucideIcon> = {
  upcoming: ClockArrowUpIcon,
  processing: LoaderIcon,
  active: PlayCircleIcon,
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
};

export const StatusColorMap: Record<MeetingType["status"], string> = {
  upcoming: "text-slate-500 bg-slate-50 border-slate-200",
  processing: "text-amber-500 bg-amber-50 border-amber-200",
  active: "text-blue-500 bg-blue-50 border-blue-200",
  completed: "text-emerald-500 bg-emerald-50 border-emerald-200",
  cancelled: "text-rose-500 bg-rose-50 border-rose-200",
};
