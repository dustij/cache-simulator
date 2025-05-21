"use client";

import { StateContext } from "@/context/StateContext";
import { schemeVariants } from "@/context/strategies/mappingScheme";
import { cn } from "@/lib/utils";
import { JSX, useContext } from "react";

export default function CacheBlock({
  index,
  size,
  variant,
}: {
  index: number;
  size: number;
  variant: schemeVariants;
}) {
  const { state } = useContext(StateContext);

  const thisBlock = state.cacheBlocks[index];
  const isValid = thisBlock != null;
  const tag = getTag(thisBlock);
  const setIndex = Math.floor(index / state.nWay);
  const setUpper = Math.ceil(index / state.nWay);

  function getTag(block: number): number {
    let address = block * state.blockSize;
    let addressBits = 0;
    let tagBits = 0;
    let shift = 0;

    switch (variant) {
      case "direct":
        addressBits = Math.floor(
          Math.log2(state.blockSize * state.numRamBlocks),
        );
        tagBits = Math.floor(
          Math.log2(state.numRamBlocks / state.numCacheBlocks),
        );
        shift = addressBits - tagBits;
        return address >>> shift;
      case "fully":
        return block ?? 0;
      case "set":
        // Set-associative: compute tag by stripping offset and set bits
        addressBits = Math.floor(
          Math.log2(state.blockSize * state.numRamBlocks),
        );
        const offsetBits = Math.floor(Math.log2(state.blockSize));
        const setsCount = state.numCacheBlocks / state.nWay;
        const setBits = Math.floor(Math.log2(setsCount));
        const addrValue = block * state.blockSize;
        // shift out offset and set bits to leave just the tag
        shift = offsetBits + setBits;
        return addrValue >>> shift;
      default:
        throw Error("Cant get tag. Missing variant");
    }
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
      {variant != "set" && (
        <div className="flex items-center justify-center px-1 text-center">
          {index}
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          index === 0 && "border-t",
        )}
      >
        {tag.toString(16).toUpperCase()}
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
      {variant === "set" && setUpper == setIndex && (
        <div
          className={cn(
            "flex items-center justify-center border-r border-b px-1 text-center",
            state.nWay === 2 && "row-span-2",
            state.nWay === 4 && "row-span-4",
            index === 0 && "border-t",
          )}
        >
          {setIndex}
        </div>
      )}
    </>
  );
}
