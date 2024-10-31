"use client";

import { useEffect, useState, useContext, MouseEventHandler } from "react";

import { NearContext } from "@/wallet/near";
import Button from "./button";

export const NearButton = () => {
  const { signedAccountId, wallet } = useContext(NearContext) as {
    signedAccountId: string | null;
    wallet: {
      signIn: () => void;
      signOut: () => void;
    } | null;
  };

  const [action, setAction] = useState<
    MouseEventHandler<HTMLButtonElement> | undefined
  >();
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login in Near Wallet");
    }
  }, [signedAccountId, wallet]);

  return (
    <Button className="btn btn-secondary" onClick={action}>
      {label}
    </Button>
  );
};
