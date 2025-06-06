"use client";

import { StateContext } from "@/context/StateContext";
import { JSX, useContext } from "react";
import Cache from "./parts/Cache";
import CPU from "./parts/CPU";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export default function DirectMapped() {
  const { state } = useContext(StateContext);

  const lines: JSX.Element[] = [];
  for (let i = 0; i < state.numRamBlocks; i++) {
    lines.push(
      <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
        <line
          x1={0}
          y1={(i % state.numCacheBlocks) * 32 + 0.5}
          x2={113}
          y2={i * 32 + 0.5}
          stroke={
            state.cacheBlocks[i % state.numCacheBlocks] === i
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
      <Cache variant="direct" />
      {lines}
      <RAM />
      <Details variant="direct" />
    </>
  );
}
