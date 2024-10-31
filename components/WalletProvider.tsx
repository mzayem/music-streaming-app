"use client";

import React, { useEffect, useState } from "react";
import { Wallet, NearContext } from "@/wallet/near";

interface WalletProviderProps {
  wallet: Wallet;
  children: React.ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({
  wallet,
  children,
}) => {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    const startUp = async () => {
      const accountId = await wallet.startUp(setSignedAccountId);
      setSignedAccountId(accountId);
    };
    startUp();
  }, [wallet]);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      {children}
    </NearContext.Provider>
  );
};

export default WalletProvider;
