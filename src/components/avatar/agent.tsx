import { AgentType } from "@/feature/agents/server/schema";
import { bottts } from "@dicebear/collection";
import { GeneratedAvatar } from "./generated";

type Props = {
  agent: Pick<AgentType, "name">;
  size?: number;
  radius?: number;
};

export function AgentAvatar({ agent, size, radius }: Props) {
  return (
    <GeneratedAvatar
      seed={agent.name}
      size={size}
      radius={radius}
      style={bottts}
    />
  );
}
