"use client";

import { StateContext } from "@/context/StateContext";
import { JSX, useContext } from "react";
import RAMBlock from "./RAMBlock";

export default function RAM() {
  const { state } = useContext(StateContext);

  const blocks: JSX.Element[] = [];
  for (let i = 0; i < state.numRamBlocks; i++) {
    blocks.push(<RAMBlock key={i} index={i} size={state.blockSize} />);
  }

  return (
    <div className="absolute top-[25px] left-[420px]">
      <p className="text-center">RAM</p>
      <div className="flex flex-col">{blocks}</div>
    </div>
  );
}
