"use client";

import { Database } from "@/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  return <>{children}</>;
}
