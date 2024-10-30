"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/uploadModal";
import SubscribeModal from "@/components/SubscribeModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal />
    </>
  );
}
