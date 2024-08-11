import Image from "next/image";

import getLikedSong from "@/actions/getLikedSong ";
import Header from "@/components/header";
import LikedContent from "./components/likedContent";
import NextTopLoader from "nextjs-toploader";

export const revalidate = 0;

export default async function LikedPage() {
  const songs = await getLikedSong();

  return (
    <div
      className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
      "
    >
      <Header>
        <div className="mt-20">
          <div
            className="
            flex
            flex-col
            items-center
            gap-x-5
            md:flex-row
            "
          >
            <div
              className="
                relative
                h-32
                w-32
                lg:-h-44
                lg:-w-44
                "
            >
              <Image
                fill
                alt="Playlist"
                className="object-cover"
                src="/images/liked-img.jpg"
              />
            </div>
            <div
              className="
                flex
                flex-col
                gap-y-2
                mt-4
                md:mt-0
                "
            >
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1
                className="
                text-white
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-bold"
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
}
