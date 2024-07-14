"use client";

import { MyUserContext } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  return <MyUserContext>{children}</MyUserContext>;
}
