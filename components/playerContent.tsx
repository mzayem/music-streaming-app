"use client";

import { Song } from "@/types";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./mediaItem";
import LikeButton from "./likeButton";
import Slider from "./slider";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Puff } from "react-loading-icons";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export default function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const duration = song.duration || 0;

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => {
      setIsPlaying(true);
      setLoading(false);
    },
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onloaderror: () => {
      setLoading(false);
    },
    onpause: () => setIsPlaying(false),

    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (isPlaying && sound) {
      const interval = setInterval(() => {
        setCurrentTime(sound.seek());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, sound]);

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else setVolume(0);
  };

  return (
    <>
      <div className="flex items-center justify-center h-1 my-1 mx-2">
        {/* <span className="flex items-center justify-center mr-2 text-neutral-400 text-sm md:hidden">
          {new Date(currentTime * 1000).toISOString().substr(14, 5)}
        </span> */}
        <Slider
          disabled={loading}
          value={currentTime}
          max={duration}
          onChange={(value) => {
            setCurrentTime(value);
            sound.seek(value);
          }}
          colorClass="bg-green-500"
        />
        {/* <span className="flex items-center justify-center ml-2 text-neutral-400 text-sm md:hidden">
          {new Date(duration * 1000).toISOString().substr(14, 5)}
        </span> */}
      </div>

      <div
        className="
        grid
        grid-cols-2
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

        <div
          className="
          flex
          md:hidden
          col-auto
          w-full
          justify-end
          items-center"
        >
          <span className="flex items-center justify-center mr-2 text-neutral-400 text-sm md:hidden">
            {`${new Date(currentTime * 1000)
              .toISOString()
              .substr(14, 5)} / ${new Date(duration * 1000)
              .toISOString()
              .substr(14, 5)}`}
          </span>
          <div
            onClick={handlePlay}
            className="
          h-10
          w-10
          flex
          items-center
          justify-center
          rounded-full
          bg-white
          p-1
          cursor-pointer
        "
          >
            {loading ? (
              <Puff stroke="#000000" fill="#000000" width={30} height={30} />
            ) : (
              <Icon size={30} className="text-black" />
            )}
          </div>
        </div>

        <div
          className="
          hidden
          h-full
          md:flex
          justify-center
          items-center
          w-full
          max-w-[722px]
          gap-x-6
      "
        >
          <AiFillStepBackward
            onClick={onPlayPrev}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            bg-white
            p-1
            cursor-pointer
        "
          >
            {loading ? (
              <Puff stroke="#000000" fill="#000000" width={30} height={30} />
            ) : (
              <Icon size={30} className="text-black" />
            )}
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>

        <div
          className="
          hidden
          md:flex
          w-full
          justify-end
          pr-2"
        >
          <span className="flex items-center justify-center mr-2 text-sm text-neutral-400">
            {`${new Date(currentTime * 1000)
              .toISOString()
              .substr(14, 5)} / ${new Date(duration * 1000)
              .toISOString()
              .substr(14, 5)}`}
          </span>
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon
              onClick={handleMute}
              size={34}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
            <Slider value={volume} onChange={(value) => setVolume(value)} />
          </div>
        </div>
      </div>
    </>
  );
}
