"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "./modal";

export default function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();

  return (
    <Modal
      title="welcome back"
      description="Login to your account"
      isOpen
      onChange={() => {}}
    >
      Auth modal CHildren
    </Modal>
  );
}
