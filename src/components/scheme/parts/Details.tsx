"use client";

import { StateContext } from "@/context/StateContext";
import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { getBlock, getOffset, getTag } from "../DirectMapped";

export default function Details() {
  const { state } = useContext(StateContext);
  const offset = getOffset(state);
  const block = getBlock(state);
  const tag = getTag(state);
  return (
    <div
      className={cn(
        "absolute right-0 left-[632px]",
        debugging && "bg-purple-400",
      )}
    >
      <div>
        <p className="text-center">Address</p>
      </div>
      <div className="grid grid-cols-3">
        <p className="px-1">Tag</p>
        <p className="px-1">Block</p>
        <p className="px-1">Offset</p>
        <div id="tag" className="border px-1">
          {tag
            .toString(2)
            .padStart(
              Math.floor(
                Math.log2(
                  Math.floor(state.ramBlocksCount / state.cacheBlocksCount),
                ),
              ),
              "0",
            )}
        </div>
        <div id="block" className="border-t border-b px-1">
          {block
            .toString(2)
            .padStart(Math.floor(Math.log2(state.cacheBlocksCount)), "0")}
        </div>
        <div id="offset" className="border px-1">
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
    </div>
  );
}
