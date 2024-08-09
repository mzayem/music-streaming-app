"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  return (
    <div className="flex flex-col gap-y-2">
      <input
        className="bg-neutral-800 rounded-lg p-2 text-white"
        placeholder="Search"
      />
    </div>
  );
}
2;
