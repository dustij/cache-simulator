"use client";

import { StateContext } from "@/context/StateContext";
import { schemeVariants } from "@/context/strategies/MappingScheme";
import { JSX, useContext } from "react";
import CacheBlock from "./CacheBlock";

export default function Cache({ variant }: { variant: schemeVariants }) {
  const { state } = useContext(StateContext);

  const blocks: JSX.Element[] = [];
  for (let i = 0; i < state.cacheBlocksCount; i++) {
    blocks.push(
      <CacheBlock key={i} index={i} size={state.blockSize} variant={variant} />,
    );
  }

  return (
    <div className="absolute top-[1px] left-[150px]">
      <p className="text-center">Cache</p>
      <div className="grid grid-cols-[auto_0.5fr_0.5fr_1fr]">
        <div className="p-1"></div>
        <p className="text-center">Tag</p>
        <p className="text-center">V</p>
        <p className="text-center">Data</p>
        {blocks}
      </div>
    </div>
  );
}
