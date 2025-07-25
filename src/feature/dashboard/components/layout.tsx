import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { DashboardCommand } from "./command";
import { DashboardSidebar } from "./sidebar/main";

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="overflow-hidden h-full">
      <DashboardSidebar />
      <SidebarInset className="pb-4 h-full overflow-y-scroll">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DashboardCommand />
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
