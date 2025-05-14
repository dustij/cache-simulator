"use client";

import { cn } from "@/lib/utils";
import { useContext } from "react";
import { CacheContext } from "../InteractiveArea";

export function CacheBlock({
  index,
  size,
  isTop,
}: {
  index: number;
  size: number;
  isTop: boolean;
}) {
  const context = useContext(CacheContext);
  if (!context)
    throw new Error("DirectMapped must be used within a CacheProvider");

  const { config, initial } = context;

  const offsetBits = Math.floor(Math.log2(config.blockSize));
  const offsetMask = (1 << offsetBits) - 1;
  const offset = config.currentAddress & offsetMask;

  const blockBits = Math.floor(Math.log2(config.cacheBlocks));
  const blockMask = ((1 << offsetBits) << blockBits) - 1;
  const block = (config.currentAddress & blockMask) >>> offsetBits;

  const blockData = [];
  for (let i = 0; i < size; i++) {
    blockData.push(
      <div
        key={i}
        className={cn(
          "h-full bg-zinc-300",
          !initial && block % config.cacheBlocks === index
            ? offset === i
              ? "bg-zinc-900"
              : "bg-zinc-400"
            : "bg-zinc-300",
        )}
      ></div>,
    );
  }

  return (
    <>
      <div className="flex items-center justify-center px-1 text-center">
        {index}
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          isTop && "border-t",
        )}
      >
        0
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          isTop && "border-t",
        )}
      >
        0
      </div>
      <div
        className={cn(
          "flex h-[32px] w-[70px] flex-col gap-[1px] border-r border-b border-l",
          isTop && "border-t",
          size === 16 && "gap-[0.5px]",
        )}
      >
        {blockData}
      </div>
    </>
  );
}
