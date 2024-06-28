"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

import Box from "@/components/box";

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

  return (
    <div className="flex h-full">
      <div
        className="
        hidden
        md:flex
        flex-col
        gap-y-2 
        bg-black
        h-full
        w-[300px]
        p-2"
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <p key={item.label}>{item.label}</p>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">Sidebar navigations</Box>
      </div>
    </div>
  );
}
