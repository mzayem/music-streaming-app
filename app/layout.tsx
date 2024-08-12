import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/supabaseProvider";
import UserProvider from "@/providers/userProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/toasterProvider";
import getSongsByUserId from "@/actions/getSongByUserId";
import Player from "@/components/player";
import NextTopLoader from "nextjs-toploader";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beat Stream",
  description: "Music streaming app",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              <NextTopLoader
                showSpinner={false}
                height={1}
                color="#22C55E"
                template='<div class="bar" role="bar"><div class="peg"></div></div>'
              />
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
