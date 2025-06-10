"use client";
import { usePathname } from "next/navigation";

export function useActiveMenu({ targetPath }: { targetPath: string }) {
  const pathname = usePathname();
  return targetPath === pathname;
}
