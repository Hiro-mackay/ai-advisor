import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AgentType } from "../server/schema";
import { AgentForm } from "./agent-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NewAgentsDialog({ open, onOpenChange }: Props) {
  const closeDialog = () => onOpenChange(false);
  const onSuccess = (data: AgentType) => {
    toast.success(`Agent ${data.name} created!!`, {
      description: "You can now use this agent to help you with your tasks",
      action: (
        <Button variant="outline" size="sm" onClick={closeDialog}>
          view agent
        </Button>
      ),
    });
    closeDialog();
  };

  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent to help you with your tasks"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm onCancel={closeDialog} onSuccess={onSuccess} />
    </ResponsiveDialog>
  );
}
