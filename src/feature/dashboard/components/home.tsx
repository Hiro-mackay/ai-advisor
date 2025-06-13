"use client";

import { authClient } from "@/lib/auth/auth.client";

export function DashboardHome() {
  const session = authClient.useSession();

  if (session.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <main className="flex flex-col gap-4 p-5">
        <p className="text-5xl font-bold">Hi! {session.data?.user.name}.</p>
      </main>
    </div>
  );
}
