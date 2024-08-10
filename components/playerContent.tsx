"use client";

import { Song } from "@/types";
import MediaItem from "./mediaItem";
import LikeButton from "./likeButton";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export default function PlayerContent({ song, songUrl }: PlayerContentProps) {
  return (
    <div
      className="
        grid
        grid-cols
        md:grid-cols-3
        h-full
        "
    >
      <div
        className="
          flex
          w-full
          justify-start
          "
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
    </div>
  );
}
