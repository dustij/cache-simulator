"use client";

import { StateContext } from "@/context/StateContext";
import { cn } from "@/lib/utils";
import { JSX, useContext } from "react";

export default function RAMBlock({
  index,
  size,
}: {
  index: number;
  size: number;
}) {
  const { state, dispatch } = useContext(StateContext);

  const isVictim = state.lastVictim === index;
  const isValid = state.cacheBlocks.includes(index);

  function getBgColor(address: number): string {
    if (isVictim) return "bg-red-300";
    if (isValid && state.currentAddress === address) return "bg-zinc-900";
    if (isValid) return "bg-zinc-400";
    return "bg-zinc-300";
  }

  const addresses: JSX.Element[] = [];
  for (let i = 0; i < state.blockSize; i++) {
    const address = index * size + i;
    const bgColor = getBgColor(address);

    addresses.push(
      <div
        key={i}
        className={cn("group relative h-full", bgColor)}
        data-tooltip={`Address: ${address}`}
        onClick={() =>
          state.scheme.handleAddressClick(address, state, dispatch)
        }
      >
        <div
          className={
            "absolute z-10 mb-1 hidden translate-x-11/12 rounded bg-black px-1 text-xs whitespace-nowrap text-white group-hover:block"
          }
        >
          Address: 0x
          {(index * size + i).toString(16).toUpperCase().padStart(2, "0")}
        </div>
      </div>,
    );
  }

  return (
    <div
      className={cn(
        "flex h-[32px] w-[70px] flex-col gap-[1px] border-r border-b border-l",
        index === 0 && "border-t",
        state.blockSize > 4 && "gap-[0.5px]",
      )}
    >
      {addresses}
    </div>
  );
}
