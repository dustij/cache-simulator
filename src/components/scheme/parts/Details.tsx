"use client";

import { StateContext } from "@/context/StateContext";
import { schemeVariants } from "@/context/strategies/MappingScheme";
import { debugging } from "@/lib/constants";
import { cn, getBlock, getOffset, getTag } from "@/lib/utils";
import { useContext } from "react";

export default function Details({ variant }: { variant: schemeVariants }) {
  const { state } = useContext(StateContext);
  const offset = getOffset(state, variant);
  const block = getBlock(state, variant);
  const tag = getTag(state, variant);

  const tagPadLength: number = (() => {
    switch (variant) {
      case "direct":
        return Math.floor(
          Math.log2(Math.floor(state.ramBlocksCount / state.cacheBlocksCount)),
        );
      case "fully":
        return Math.floor(Math.log2(state.ramBlocksCount));
      case "set":
        throw Error("Not implemented");
      default:
        throw Error("Can't pad tag. Missing variant.");
    }
  })();

  return (
    <div
      className={cn(
        "absolute right-0 left-[632px] h-full",
        debugging && "bg-purple-400",
      )}
    >
      <div>
        <p className="text-center">Address</p>
      </div>
      <div
        className={cn(
          "grid",
          variant === "fully" ? "grid-cols-2" : "grid-cols-3",
        )}
      >
        <p className="px-1">Tag</p>
        {variant === "direct" && <p className="px-1">Block</p>}
        {variant === "set" && <p className="px-1">Set</p>}
        <p className="px-1">Offset</p>
        <div id="tag" className="border px-1">
          {tag.toString(2).padStart(tagPadLength, "0")}
        </div>
        {variant != "fully" && (
          <div id="block" className="border-t border-b px-1">
            {block
              .toString(2)
              .padStart(Math.floor(Math.log2(state.cacheBlocksCount)), "0")}
          </div>
        )}
        <div
          id="offset"
          className={cn(
            "px-1",
            variant === "fully" ? "border-t border-r border-b" : "border",
          )}
        >
          {offset
            .toString(2)
            .padStart(Math.floor(Math.log2(state.blockSize)), "0")}
        </div>
      </div>
      <div className="flex gap-3 pt-2.5">
        <div className="flex gap-0.5">
          <p>Hits:</p>
          <p>{state.totalHits}</p>
        </div>
        <div className="flex gap-0.5">
          <p>Misses: </p>
          <p>{state.totalMisses}</p>
        </div>
      </div>
      <div className="flex gap-0.5 pb-2.5">
        <p>Hit Ratio:</p>
        <p>
          {(
            (state.totalHits / (state.totalHits + state.totalMisses) || 0) * 100
          ).toFixed(1)}
          %
        </p>
      </div>
      <div>
        {state.cacheBlocks.length === 0 ? (
          ""
        ) : state.wasHit ? (
          <div>
            <p>Steps:</p>
            <ol type="1" className="ml-4 list-decimal">
              <li>
                <p>Check Cache for Tag/Block</p>
                <p>HIT - Data Found</p>
              </li>
              <li>Copy Data from Cache to CPU</li>
            </ol>
          </div>
        ) : (
          <div>
            <p>Steps:</p>
            <ol type="1" className="ml-4 list-decimal">
              <li>
                <p>Check Cache for Tag/Block</p>
                <p>MISS - Data Not in Cache</p>
              </li>
              <li>Copy Block from RAM to Cache</li>
              <li>Update Tag and Valid Bit</li>
              <li>Copy Data from Cache to CPU</li>
            </ol>
          </div>
        )}
      </div>
      {variant != "direct" && (
        <div className="absolute bottom-0 left-0 w-full p-2">
          <p>Note: Replacement = FIFO</p>
        </div>
      )}
    </div>
  );
}
