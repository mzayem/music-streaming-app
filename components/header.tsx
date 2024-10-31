"use client";

import { useEffect, useState, useContext, MouseEventHandler } from "react";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NearContext } from "@/wallet/near";

import Button from "@/components/button";
import { useUser } from "@/hooks/useUser";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  const player = usePlayer();
  const authModal = useAuthModal();
  const router = useRouter();
  // near wallet check
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

  // Near wallet end

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
    `,
        className
      )}
    >
      <div
        className="
        flex
        items-center
        justify-between
        mb-4
        w-full"
      >
        <div
          className="
          hidden
          md:flex
          gap-x-2
          items-center"
        >
          <button
            onClick={() => router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover: opacity-75
            transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover: opacity-75
            transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden items-center gap-x-2">
          <button
            onClick={() => router.push("/")}
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
          flex
          justify-between
          items-center
          gap-x-4"
        >
          {" "}
          <Button className="btn btn-secondary" onClick={action}>
            {label}
          </Button>
          {user ? (
            <div className="flex gap-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                LogOut
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUser />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-5 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
