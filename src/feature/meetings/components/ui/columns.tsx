import { ColumnDef } from "@tanstack/react-table";
import { MeetingType } from "../../servers/schema/query";

export const MeetingColumns: ColumnDef<MeetingType>[] = [
  {
    header: "Meeting",
    cell: ({ row }) => {
      return <div>{row.original.title}</div>;
    },
  },
];
