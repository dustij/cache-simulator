"use client";

import { StateContext } from "@/context/StateContext";
import { JSX, useContext } from "react";
import CPU from "./parts/CPU";
import Cache from "./parts/Cache";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export default function SetAssociative() {
  const { state } = useContext(StateContext);
  const setsCount = Math.floor(state.cacheBlocksCount / state.nWay);

  const lines: JSX.Element[] = [];
  for (let i = 0; i < state.ramBlocksCount; i++) {
    const blockHeight = 32;
    const setIndex = i % setsCount;
    const setHeight = blockHeight * state.nWay;
    const y1pos = setIndex * setHeight + setHeight / 2 + 0.5 - 12;
    lines.push(
      <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
        <line
          x1={0}
          y1={y1pos}
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
      <Cache variant="set" />
      {lines}
      <RAM />
      <Details variant="set" />
    </>
  );
}
