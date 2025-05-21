import { State } from "@/context/StateContext";
import { schemeVariants } from "@/context/strategies/MappingScheme";
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
    Math.log2(state.blockSize * state.ramBlocksCount),
  );

  let tagBits = 0;

  if (variant === "direct") {
    tagBits = Math.floor(
      Math.log2(state.ramBlocksCount / state.cacheBlocksCount),
    );
  }

  if (variant === "fully") {
    if (block) {
      console.log("called getTag with block: " + block);
      return block;
    }
    tagBits = Math.floor(Math.log2(state.ramBlocksCount));
  }

  const shift = addressBits - tagBits;
  return state.currentAddress >>> shift;
}

export function getBlock(state: State, variant: schemeVariants): number {
  const blockBits = Math.floor(Math.log2(state.cacheBlocksCount));
  const bitOffset = Math.floor(Math.log2(state.blockSize));
  const mask = ((1 << blockBits) << bitOffset) - 1;
  return (state.currentAddress & mask) >>> bitOffset;
}

export function getOffset(state: State, variant: schemeVariants): number {
  const offsetBits = Math.floor(Math.log2(state.blockSize));
  const mask = (1 << offsetBits) - 1;
  return state.currentAddress & mask;
}
