"use client";

import { AgentAvatar } from "@/components/avatar/agent";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/dialog";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AgentType } from "../../server/schema/query";

type Props = {
  agent: AgentType;
  open: boolean;
  onCancel: () => void;
};

export function RemoveAgentDialog({ agent, open, onCancel }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.agents.getAll.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.agents.getById.queryKey({ id: agent.id }),
        });
        router.push("/agents");
        toast.success("Agent removed successfully");
        onCancel();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <ResponsiveDialog
      title="Remove Agent"
      description="Are you sure you want to remove this agent?"
      open={open}
      onOpenChange={onCancel}
    >
      <div className="flex items-center gap-2">
        <AgentAvatar agent={agent} size={50} />
        <p className="text-lg font-medium">{agent.name}</p>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={removeAgent.isPending}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => removeAgent.mutate({ id: agent.id })}
          disabled={removeAgent.isPending}
        >
          Remove
        </Button>
      </div>
    </ResponsiveDialog>
  );
}
