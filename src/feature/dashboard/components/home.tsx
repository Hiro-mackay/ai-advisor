"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth.client";
import { useRouter } from "next/navigation";

export function DashboardHome() {
  const router = useRouter();
  const session = authClient.useSession();

  if (session.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <header className="flex justify-between p-5 border-b">
        <h1 className="text-2xl font-bold">AI Advisor</h1>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/login");
                },
              },
            })
          }
        >
          Logout
        </Button>
      </header>
      <main className="flex flex-col gap-4 p-5">
        <p className="text-5xl font-bold">Hi! {session.data?.user.name}.</p>
      </main>
    </div>
  );
}
