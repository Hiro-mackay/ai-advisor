import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { ReactNode } from "react";
import { AgentAvatar } from "../avatar/agent";

type Props = {
  title?: string;
  description?: string;
  className?: string;
  action?: ReactNode;
};

export function EmptyState({
  title = "Data not found",
  description,
  className,
  action,
}: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <AgentAvatar
        agent={{ name: nanoid() }}
        backgroundType={["gradientLinear"]}
      />
      <p className="text-muted-foreground font-semibold">{title}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
      {action}
    </div>
  );
}
