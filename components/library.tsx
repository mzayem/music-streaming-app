"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./mediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface LibraryProps {
  songs: Song[];
}

export default function Library({ songs }: LibraryProps) {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div
        className="
        flex 
        items-center
        justify-between
        px-5
        pt-4"
      >
        <div
          className="
          inline-flex
          items-center
          gap-x-2"
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="
            text-neutral-400 
            font-medium
            text-md "
          >
            your library
          </p>
        </div>
        <AiOutlinePlus
          className="
          text-neutral-400
          cursor-pointer
          hover:text-white
          transition"
          size={26}
          onClick={onClick}
        />
      </div>
      <div
        className="
        flex
        flex-col
        gap-y-2 
        mt-4
        px-3"
      >
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}
