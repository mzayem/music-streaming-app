"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

export default function Library() {
  const onClick = () => {
    alert("upload component under construction!");
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
        List of Songs!
      </div>
    </div>
  );
}
