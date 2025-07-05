import { MeetingType } from "../../servers/schema/query";
import { ColumnDef } from "@tanstack/react-table";

export const MeetingColumns: ColumnDef<MeetingType>[] = [
  {
    header: "Meeting",
    cell: ({ row }) => {
      return <div>{row.original.title}</div>;
    },
  },
];
