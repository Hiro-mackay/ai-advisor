"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth.client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = authClient.useSession();
  const router = useRouter();
  if (session.isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session.data?.user ? (
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">
              Hello!! {session.data.user.name}.
            </p>
            <Button onClick={() => authClient.signOut()}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </main>
    </div>
  );
}
