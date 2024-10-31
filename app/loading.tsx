"use client";

import { ThreeDots } from "react-loading-icons";

import Box from "@/components/box";

export default function Loading() {
  return (
    <Box className="flex items-center justify-center h-full">
      <ThreeDots color="#ffffff" height={50} width={50} />
    </Box>
  );
}
