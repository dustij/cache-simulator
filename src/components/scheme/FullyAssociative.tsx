import { StateContext } from "@/context/StateContext";
import { JSX, useContext } from "react";
import CPU from "./parts/CPU";
import Cache from "./parts/Cache";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export default function FullyAssociative() {
  const { state } = useContext(StateContext);

  const lines: JSX.Element[] = [];
  for (let i = 0; i < state.cacheBlocks.length; i++) {
    lines.push(
      <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
        <line
          x1={0}
          y1={(i % state.cacheBlocksCount) * 32 + 0.5}
          x2={113}
          y2={state.cacheBlocks[i] * 32 + 0.5}
          stroke="black"
          strokeWidth={1}
        />
      </svg>,
    );
  }
  return (
    <>
      <CPU />
      <Cache variant="fully" />
      {lines}
      <RAM />
      <Details variant="fully" />
    </>
  );
}
