import { twMerge } from "tailwind-merge";

interface Boxprops {
  children: React.ReactNode;
  className?: string;
}

export default function Box({ children, className }: Boxprops) {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
}
