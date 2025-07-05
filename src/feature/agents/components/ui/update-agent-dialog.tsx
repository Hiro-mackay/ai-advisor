import { ResponsiveDialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AgentForm } from "./agent-form";
import { AgentType } from "../../server/schema/query";

type Props = {
  agent: AgentType;
  open: boolean;
  onCancel: () => void;
};

export function UpdateAgentDialog({ agent, open, onCancel }: Props) {
  const onSuccess = (agent: AgentType) => {
    toast.success(`Agent ${agent.name} updated!!`, {
      description: "You can now use this agent to help you with your tasks",
    });
    onCancel();
  };

  return (
    <ResponsiveDialog
      title="Update Agent"
      description="Update the agent to help you with your tasks"
      open={open}
      onOpenChange={onCancel}
    >
      <AgentForm
        defaultValues={agent}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    </ResponsiveDialog>
  );
}
