"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

interface Sidebarprops {
  children: React.ReactNode;
}
export default function Sidebar({ children }: Sidebarprops) {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        href: "/",
        active: pathname !== "/search",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return <div className="flex h-full">Sidebar!</div>;
}
