import { AgentType } from "@/feature/agents/server/schema/query";
import { bottts } from "@dicebear/collection";
import { BackgroundType } from "@dicebear/core";
import { GeneratedAvatar } from "./generated";

type Props = {
  agent: Pick<AgentType, "name">;
  size?: number;
  radius?: number;
  backgroundType?: BackgroundType[];
};

export function AgentAvatar({ agent, size, radius, backgroundType }: Props) {
  return (
    <GeneratedAvatar
      seed={agent.name}
      size={size}
      radius={radius}
      style={bottts}
      backgroundType={backgroundType}
    />
  );
}
