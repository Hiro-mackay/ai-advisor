"use client";

import { cn } from "@/lib/utils";
import { BotIcon } from "lucide-react";
import { FallbackProps } from "react-error-boundary";

export function ErrorState({ error }: FallbackProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center")}>
      <div className="flex gap-2 items-center text-red-500">
        <BotIcon className="size-16" />
        <p className="text-2xl font-bold pt-4">Oops!</p>
      </div>
      <p className="text-muted-foreground font-semibold">{error.message}</p>
    </div>
  );
}
