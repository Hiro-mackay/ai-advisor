import { DashboardHome } from "@/feature/dashboard/components/home";
import { auth } from "@/lib/auth/auth.server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <DashboardHome />;
}
