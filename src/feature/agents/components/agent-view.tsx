"use client";

import { AgentAvatar } from "@/components/avatar/agent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { AgentHeader } from "./agent-header";

type Props = {
  agentId: string;
};

export function AgentView({ agentId }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getById.queryOptions({
      id: agentId,
    })
  );

  return (
    <div>
      <AgentHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AgentAvatar agent={data} size={50} />
            <CardTitle>
              <p className="text-lg font-medium">{data.name}</p>
              <p className="text-sm text-muted-foreground">{data.id}</p>
            </CardTitle>
            <div className="ml-auto">
              <Button variant="outline" size="sm">
                <VideoIcon className="size-4 text-blue-500" />
                <span>Meeting</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-2">
              <Label className="text-lg font-medium">Instructions:</Label>
              <p>{data.instructions}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
