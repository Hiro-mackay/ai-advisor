import { ResponsiveDialog } from "@/components/ui/dialog";
import { MeetingType } from "../../servers/schema/query";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

type Props = {
  meeting: MeetingType;
  open: boolean;
  onCancel: () => void;
};

export function RemoveMeetingDialog({ meeting, open, onCancel }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.meetings.getAll.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.meetings.getById.queryKey({ id: meeting.id }),
        });
        toast.success("Meeting removed successfully");
        onCancel();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <ResponsiveDialog
      title="Remove Meeting"
      open={open}
      onOpenChange={onCancel}
    >
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">{meeting.title}</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={removeMeeting.isPending}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => removeMeeting.mutate({ id: meeting.id })}
          disabled={removeMeeting.isPending}
        >
          Remove
        </Button>
      </div>
    </ResponsiveDialog>
  );
}
