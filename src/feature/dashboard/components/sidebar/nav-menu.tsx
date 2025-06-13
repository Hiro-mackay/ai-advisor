"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActiveMenu } from "../../hooks/active-menu";
import { NavItems, NavItemType } from "./nav-items";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {NavItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className="text-xl">
              {item.items ? (
                <NavItemCollapsible item={item} />
              ) : (
                <NavItemLink item={item} />
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavItemLink({ item }: { item: NavItemType }) {
  const isActive = useActiveMenu({ targetPath: item.url });
  const { open } = useSidebar();
  return (
    <SidebarMenuButton
      tooltip={item.title}
      asChild
      size="lg"
      isActive={isActive}
      className={cn(!open && "justify-center")}
    >
      <Link href={item.url}>
        <NavItem item={item} />
      </Link>
    </SidebarMenuButton>
  );
}

function NavItemCollapsible({ item }: { item: NavItemType }) {
  const isActive = useActiveMenu({ targetPath: item.url });
  const { open } = useSidebar();

  function SubItem({
    item,
  }: {
    item: Exclude<NavItemType["items"], undefined>[number];
  }) {
    const isActive = useActiveMenu({ targetPath: item.url });
    return (
      <SidebarMenuSubItem key={item.title}>
        <SidebarMenuSubButton
          isActive={isActive}
          className={cn(!open && "justify-center")}
        >
          <Link href={item.url}>
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return (
    <>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton tooltip={item.title} size="lg" isActive={isActive}>
          <NavItem item={item} isCollapsible />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SubItem key={subItem.title} item={subItem} />
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </>
  );
}

function NavItem({
  item,
  isCollapsible,
}: {
  item: NavItemType;
  isCollapsible?: boolean;
}) {
  const { open } = useSidebar();
  return (
    <>
      {item.icon && <item.icon />}
      <span className={cn(!open && "hidden")}>{item.title}</span>
      {isCollapsible && (
        <ChevronRight
          className={cn(
            "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
            !open && "hidden"
          )}
        />
      )}
    </>
  );
}
