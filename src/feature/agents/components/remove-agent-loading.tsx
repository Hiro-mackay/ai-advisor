import { AgentAvatar } from "@/components/avatar/agent";

export function RemoveAgentLoading({ name }: { name: string }) {
  return (
    <div className="p-10 flex justify-center">
      <div className="flex items-center gap-2">
        <AgentAvatar agent={{ name }} size={50} />
        <p className="text-lg font-medium">{name} is being removed...</p>
      </div>
    </div>
  );
}
