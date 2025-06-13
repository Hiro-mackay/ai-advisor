"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export function DashboardHome() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Antonio" }));

  return (
    <div className="flex flex-col gap-4 h-full">
      <main className="flex flex-col gap-4 p-5">
        <p className="text-5xl font-bold">{data?.greeting}.</p>
      </main>
    </div>
  );
}
