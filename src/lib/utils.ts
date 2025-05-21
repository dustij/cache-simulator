import { State } from "@/context/StateContext";
import { schemeVariants } from "@/context/strategies/mappingScheme";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTag(
  state: State,
  variant: schemeVariants,
  block?: number,
): number {
  const addressBits = Math.floor(
    Math.log2(state.blockSize * state.numRamBlocks),
  );

  let tagBits = 0;

  if (variant === "direct") {
    tagBits = Math.floor(Math.log2(state.numRamBlocks / state.numCacheBlocks));
  }

  if (variant === "fully") {
    if (block) {
      return block;
    }
    tagBits = Math.floor(Math.log2(state.numRamBlocks));
  }

  if (variant === "set") {
    const numSets = Math.floor(state.numCacheBlocks / state.nWay);
    tagBits = Math.floor(Math.log2(state.numRamBlocks / numSets));
  }

  const shift = addressBits - tagBits;
  return state.currentAddress >>> shift;
}

export function getBlock(state: State): number {
  const blockBits = Math.floor(Math.log2(state.numCacheBlocks));
  const bitOffset = Math.floor(Math.log2(state.blockSize));
  const mask = ((1 << blockBits) << bitOffset) - 1;
  return (state.currentAddress & mask) >>> bitOffset;
}

export function getOffset(state: State): number {
  const offsetBits = Math.floor(Math.log2(state.blockSize));
  const mask = (1 << offsetBits) - 1;
  return state.currentAddress & mask;
}

export function getSet(state: State): number {
  const blockNumber = Math.floor(state.currentAddress / state.blockSize);
  const numSets = Math.floor(state.numCacheBlocks / state.nWay);
  return blockNumber % numSets;
}
