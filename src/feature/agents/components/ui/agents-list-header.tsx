"use client";

import { Button } from "@/components/ui/button";
import { NewAgentsDialog } from "@/feature/agents/components/ui/new-agents-dialog";
import { PlusIcon } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import { SearchFilterInput } from "@/components/search-params/search-filter-input";

export function AgentsListHeader() {
  const { open, onOpen, onClose } = useDialog();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Agents</h2>

        <Button onClick={onOpen}>
          <PlusIcon className="w-4 h-4" />
          New Agent
        </Button>
      </div>

      <SearchFilterInput />

      <NewAgentsDialog open={open} onClose={onClose} />
    </>
  );
}
