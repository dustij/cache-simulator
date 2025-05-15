"use client";

import { cn, getBlock, getOffest, getTag } from "@/lib/utils";
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

  const offset = getOffest(config.currentAddress, config.blockSize);
  const block = getBlock(
    config.currentAddress,
    config.cacheBlocks,
    config.blockSize,
  );
  const tag = getTag(
    config.currentAddress,
    config.ramBlocks,
    config.cacheBlocks,
    config.blockSize,
  );

  const loadedBlock = config.cacheLines[index];
  const blockTag =
    loadedBlock != null
      ? getTag(
          loadedBlock * config.blockSize,
          config.ramBlocks,
          config.cacheBlocks,
          config.blockSize,
        )
      : null;

  let isValid = false;

  const blockData = [];
  for (let i = 0; i < size; i++) {
    const isCurrentBlock = !initial && block % config.cacheBlocks === index;
    isValid = !initial && config.cacheLines[index] !== null;
    let cellClass = isValid ? "bg-zinc-400" : "bg-zinc-300";
    if (isCurrentBlock) {
      cellClass = i === offset ? "bg-zinc-900" : "bg-zinc-400";
    }

    blockData.push(<div key={i} className={cn("h-full", cellClass)}></div>);
  }

  return (
    <>
      <div className="flex items-center justify-center px-1 text-center">
        {index}
      </div>
      {/* TAG */}
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          isTop && "border-t",
        )}
      >
        {blockTag || 0}
      </div>
      {/* VALID */}
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          isTop && "border-t",
        )}
      >
        {isValid ? 1 : 0}
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
