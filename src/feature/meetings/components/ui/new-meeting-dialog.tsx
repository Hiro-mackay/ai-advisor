import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MeetingType } from "../../servers/schema/query";
import { MeetingForm } from "./meeting-form";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function NewMeetingDialog({ open, onClose }: Props) {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.agents.getAll.queryOptions({}));
  const router = useRouter();

  const onSuccess = (data: MeetingType) => {
    toast.success(`Meeting ${data.title} created!!`, {
      description: "You can now use this meeting to help you with your tasks",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/meetings/${data.id}`)}
        >
          view meeting
        </Button>
      ),
    });
    onClose();
  };

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting"
      open={open}
      onOpenChange={onClose}
    >
      <MeetingForm
        onCancel={onClose}
        onSuccess={onSuccess}
        options={{
          loading: isPending,
          agents: data?.agents ?? [],
        }}
      />
    </ResponsiveDialog>
  );
}
