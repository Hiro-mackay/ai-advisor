"use client";

import { Bot, LucideIcon, VideoIcon } from "lucide-react";

export type NavItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
};

// This is sample data.
export const NavItems: NavItemType[] = [
  {
    title: "Meetings",
    url: "/meetings",
    icon: VideoIcon,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: Bot,
  },
];
