"use client";

import { State, StateContext } from "@/context/StateContext";
import { JSX, useContext } from "react";
import Cache from "./parts/Cache";
import CPU from "./parts/CPU";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export function getTag(state: State): number {
  const addressBits = Math.floor(
    Math.log2(state.blockSize * state.ramBlocksCount),
  );
  const tagBits = Math.floor(
    Math.log2(state.ramBlocksCount / state.cacheBlocksCount),
  );
  const shift = addressBits - tagBits;
  return state.currentAddress >>> shift;
}

export function getBlock(state: State): number {
  const blockBits = Math.floor(Math.log2(state.cacheBlocksCount));
  const bitOffset = Math.floor(Math.log2(state.blockSize));
  const mask = ((1 << blockBits) << bitOffset) - 1;
  return (state.currentAddress & mask) >>> bitOffset;
}

export function getOffset(state: State): number {
  const offsetBits = Math.floor(Math.log2(state.blockSize));
  const mask = (1 << offsetBits) - 1;
  return state.currentAddress & mask;
}

export default function DirectMapped() {
  const { state } = useContext(StateContext);

  const lines: JSX.Element[] = [];
  for (let i = 0; i < state.ramBlocksCount; i++) {
    lines.push(
      <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
        <line
          x1={0}
          y1={(i % state.cacheBlocksCount) * 32 + 0.5}
          x2={113}
          y2={i * 32 + 0.5}
          stroke={
            state.cacheBlocks[i % state.cacheBlocksCount] === i
              ? "black"
              : "rgba(0, 0, 0, 0.15)"
          }
          strokeWidth={1}
        />
      </svg>,
    );
  }

  return (
    <>
      <CPU />
      <Cache />
      {lines}
      <RAM />
      <Details />
    </>
  );
}
