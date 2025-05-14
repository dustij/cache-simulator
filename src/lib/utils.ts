import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOffest(address: number, bytesInBlock: number): number {
  const bits = Math.floor(Math.log2(bytesInBlock)); // number of bits needed to address each byte in block
  const mask = (1 << bits) - 1; // for example: 2 bits would look like this 001 -> 100 -> 011 (mask for lowest 2 bits)
  return address & mask;
}

export function getBlock(
  address: number,
  blocksInCache: number,
  bytesInBlock: number,
): number {
  const bits = Math.floor(Math.log2(blocksInCache));
  const bitOffset = Math.floor(Math.log2(bytesInBlock));
  const mask = ((1 << bits) << bitOffset) - 1;
  return (address & mask) >>> bitOffset;
}

export function getTag(
  address: number,
  blocksInRam: number,
  blocksInCache: number,
  bytesInBlock: number,
): number {
  const bits = Math.floor(Math.log2(Math.floor(blocksInRam / blocksInCache)));
  const addressSize = Math.floor(Math.log2(bytesInBlock * blocksInRam));
  const shift = addressSize - bits;
  return address >>> shift;
}

export function getSet(
  address: number,
  blocksInCache: number,
  nWay: number,
): number {
  return 0;
}
