"use client";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useEffect } from "react";
import MediaItem from "@/components/mediaItem";
import LikeButton from "@/components/likeButton";
import useOnPlay from "@/hooks/useOnPlay";
import useAuthModal from "@/hooks/useAuthModal";

interface LikedContentProps {
  songs: Song[];
}

export default function LikedContent({ songs }: LikedContentProps) {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const authModal = useAuthModal();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router, authModal]);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
    "
      >
        No liked yet
      </div>
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-y-2
        w-full
        p-6
        "
    >
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
