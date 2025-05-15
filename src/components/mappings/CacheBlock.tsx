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

  // console.log("#################");
  const blockData = [];
  for (let i = 0; i < size; i++) {
    const isCurrentBlock = !initial && block % config.cacheBlocks === index;
    // const isCurrentBlock = !initial && index === lineIndex;
    const isValid = !initial && config.cacheLines[index] !== null;
    // console.log("================");
    // console.log("line#: " + i);
    // console.log("cache#: " + index);
    // console.log("block#: " + block);
    // console.log(config.cacheLines);
    // console.log("is valid: " + isValid);
    // const cellClass = isCurrentBlock
    //   ? offset === i
    //     ? "bg-zinc-900"
    //     : "bg-zinc-400"
    //   : isValid
    //     ? "bg-zinc-400"
    //     : "bg-zinc-300";
    let cellClass = isValid ? "bg-zinc-400" : "bg-zinc-300";
    if (isCurrentBlock) {
      cellClass = i === offset ? "bg-zinc-900" : "bg-zinc-400";
    }

    blockData.push(
      // <div key={i} className={cn("h-full bg-zinc-300", cellClass)}></div>,
      <div key={i} className={cn("h-full", cellClass)}></div>,
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
