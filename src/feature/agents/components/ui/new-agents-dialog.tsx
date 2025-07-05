import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AgentType } from "../../server/schema/query";
import { AgentForm } from "./agent-form";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function NewAgentsDialog({ open, onClose }: Props) {
  const router = useRouter();
  const onSuccess = (data: AgentType) => {
    toast.success(`Agent ${data.name} created!!`, {
      description: "You can now use this agent to help you with your tasks",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/agents/${data.id}`)}
        >
          view agent
        </Button>
      ),
    });
    onClose();
  };

  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent to help you with your tasks"
      open={open}
      onOpenChange={onClose}
    >
      <AgentForm onCancel={onClose} onSuccess={onSuccess} />
    </ResponsiveDialog>
  );
}
