"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-menu";
import { NavUser } from "./nav-user";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-slate-900" {...props}>
      <SidebarHeader>
        {open ? (
          <div className="text-4xl font-bold">AI advisor</div>
        ) : (
          <div className="text-3xl font-bold">AI</div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
