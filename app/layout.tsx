"use client";

import Player from "@/components/player";
import SupabaseProvider from "@/providers/supabaseProvider";
import ToasterProvider from "@/providers/toasterProvider";
import UserProvider from "@/providers/userProvider";
import { Figtree } from "next/font/google";
import "./globals.css";

import { NetworkId } from "@/config";
import { Wallet } from "@/wallet/near"; // Import Wallet class

import WalletProvider from "@/components/WalletProvider"; // Make sure this path is correct

const font = Figtree({ subsets: ["latin"] });

const wallet = new Wallet({
  networkId: NetworkId,
  createAccessKeyFor: "beat-stream.testnet",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Beat Stream</title>
      </head>
      <body className={font.className}>
        <WalletProvider wallet={wallet}>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              {children}
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
