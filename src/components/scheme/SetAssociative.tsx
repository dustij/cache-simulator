"use client";

import { StateContext } from "@/context/StateContext";
import { JSX, useContext } from "react";
import CPU from "./parts/CPU";
import Cache from "./parts/Cache";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export default function SetAssociative() {
  const { state } = useContext(StateContext);
  const numSets = Math.floor(state.numCacheBlocks / state.nWay);

  const lines: JSX.Element[] = [];
  for (let i = 0; i < state.numRamBlocks; i++) {
    const blockHeight = 32;
    const setIndex = i % numSets;
    const setHeight = blockHeight * state.nWay;
    const y1pos = setIndex * setHeight + setHeight / 2 + 0.5 - 12;

    // Determine if this RAM block's tag is present in its corresponding cache set
    const nWay = state.nWay;
    const setsCount = Math.floor(state.numCacheBlocks / nWay);
    const setIndexForBlock = i % setsCount;
    const setStart = setIndexForBlock * nWay;
    const setEnd = setStart + nWay;
    const isInCacheSet = state.cacheBlocks.slice(setStart, setEnd).includes(i);

    lines.push(
      <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
        <line
          x1={0}
          y1={y1pos}
          x2={113}
          y2={i * 32 + 0.5}
          stroke={isInCacheSet ? "black" : "rgba(0, 0, 0, 0.15)"}
          strokeWidth={1}
        />
      </svg>,
    );
  }
  return (
    <>
      <CPU />
      <Cache variant="set" />
      {lines}
      <RAM />
      <Details variant="set" />
    </>
  );
}
