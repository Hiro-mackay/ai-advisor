import { ResponsiveDialog } from "@/components/ui/dialog";
import { MeetingType } from "../../servers/schema/query";
import { MeetingForm } from "./meeting-form";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

type Props = {
  meeting: MeetingType;
  open: boolean;
  onCancel: () => void;
};

export function UpdateMeetingDialog({ meeting, open, onCancel }: Props) {
  const onSuccess = (meeting: MeetingType) => {
    toast.success(`Meeting ${meeting.title} updated!!`, {
      description: "You can now use this meeting to help you with your tasks",
    });
    onCancel();
  };

  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.agents.getAll.queryOptions({}));

  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update the meeting to help you with your tasks"
      open={open}
      onOpenChange={onCancel}
    >
      <MeetingForm
        defaultValues={meeting}
        onCancel={onCancel}
        onSuccess={onSuccess}
        options={{
          loading: isPending,
          agents: data?.agents ?? [],
        }}
      />
    </ResponsiveDialog>
  );
}
