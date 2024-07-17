"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/modal";

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
      <Modal />
    </>
  );
}
