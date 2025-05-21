"use client";

import { StateContext } from "@/context/StateContext";
import { schemeVariants } from "@/context/strategies/mappingScheme";
import { cn } from "@/lib/utils";
import { JSX, useContext } from "react";
import CacheBlock from "./CacheBlock";

export default function Cache({ variant }: { variant: schemeVariants }) {
  const { state } = useContext(StateContext);

  const blocks: JSX.Element[] = [];
  for (let i = 0; i < state.numCacheBlocks; i++) {
    blocks.push(
      <CacheBlock key={i} index={i} size={state.blockSize} variant={variant} />,
    );
  }

  return (
    <div className="absolute top-[1px] left-[150px]">
      <p className="text-center">Cache</p>
      <div
        className={cn(
          "grid",
          variant === "set"
            ? "grid-cols-[0.5fr_0.5fr_1fr_auto]"
            : "grid-cols-[auto_0.5fr_0.5fr_1fr]",
        )}
      >
        {variant != "set" && <div className="p-1"></div>}
        <p className="text-center">Tag</p>
        <p className="text-center">V</p>
        <p className="text-center">Data</p>
        {variant === "set" && <div className="p-1"></div>}
        {blocks}
      </div>
    </div>
  );
}
