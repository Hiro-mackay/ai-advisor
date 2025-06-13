import { DashboardLayout } from "@/feature/dashboard/components/layout";
import { auth } from "@/lib/auth/auth.server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
