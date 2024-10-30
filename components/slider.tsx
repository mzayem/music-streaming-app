"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  colorClass?: string;
  disabled?: boolean;
}

export default function Slider({
  value,
  onChange,
  max,
  colorClass,
  disabled,
}: SliderProps) {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      disabled={disabled}
      className="
        flex
        relative
        items-center
        select-none
        touch-none
        w-full
        h-10
        group
        cursor-pointer
  "
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={max || 1}
      step={0.01}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className="
          bg-neutral-600
          relative
          grow
          rounded-full
          h-[3px]
          group-hover:h-[6px]
          "
      >
        <RadixSlider.Range
          className={twMerge(
            `absolute
            bg-white
            rounded-full
            h-full
            `,
            colorClass
          )}
        />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="
        hidden
        group-hover:block
        transition-opacity duration-300 ease-in-out 
        opacity-0
        group-hover:opacity-100
        h-3
        w-3
      bg-white
        rounded-full"
      />
    </RadixSlider.Root>
  );
}
