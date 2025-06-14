"use client";

import { Button } from "@/components/ui/button";
import { NewAgentsDialog } from "@/feature/agents/components/new-agents-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AgentsSearchFilter } from "./agents-search-filter";

export function AgentsListHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Agents</h2>

        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="w-4 h-4" />
          New Agent
        </Button>
      </div>

      <AgentsSearchFilter />

      <NewAgentsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
