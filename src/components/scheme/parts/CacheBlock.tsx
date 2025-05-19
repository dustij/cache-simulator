"use client";

import { StateContext } from "@/context/StateContext";
import { cn } from "@/lib/utils";
import { JSX, useContext } from "react";

export default function CacheBlock({
  index,
  size,
}: {
  index: number;
  size: number;
}) {
  const { state } = useContext(StateContext);

  const thisBlock = state.cacheBlocks[index];
  const isValid = thisBlock != null;
  const tag = getTag(thisBlock);

  function getTag(block: number): number {
    const address = block * state.blockSize;
    const addressBits = Math.floor(
      Math.log2(state.blockSize * state.ramBlocksCount),
    );
    const tagBits = Math.floor(
      Math.log2(state.ramBlocksCount / state.cacheBlocksCount),
    );
    const shift = addressBits - tagBits;
    return address >>> shift;
  }

  function getBgColor(address: number): string {
    if (isValid && state.currentAddress === address) return "bg-zinc-900";
    if (isValid) return "bg-zinc-400";
    return "bg-zinc-300";
  }

  const addresses: JSX.Element[] = [];
  for (let i = 0; i < state.blockSize; i++) {
    const address = thisBlock * size + i;
    const bgColor = getBgColor(address);
    addresses.push(<div key={i} className={cn("h-full", bgColor)}></div>);
  }

  return (
    <>
      <div className="flex items-center justify-center px-1 text-center">
        {index}
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          index === 0 && "border-t",
        )}
      >
        {tag.toString(16)}
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          index === 0 && "border-t",
        )}
      >
        {isValid ? 1 : 0}
      </div>
      <div
        className={cn(
          "flex h-[32px] w-[70px] flex-col gap-[1px] border-r border-b border-l",
          index === 0 && "border-t",
          state.blockSize > 4 && "gap-[0.5px]",
        )}
      >
        {addresses}
      </div>
    </>
  );
}
