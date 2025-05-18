"use client";

import { debugging } from "@/lib/constants";
import { cn, getOffest } from "@/lib/utils";
import { useContext } from "react";
import { Arrow } from "../Arrow";
import { CacheContext } from "../InteractiveArea";
import { CacheBlock } from "./CacheBlock";
import { RamBlock } from "./RamBlock";

export function FullyAssociative() {
  const context = useContext(CacheContext);

  if (!context)
    throw new Error("DirectMapped must be used within a CacheProvider");

  const { config, initial } = context;

  const cacheBlocks = [];
  for (let i = 0; i < config.cacheBlocks; i++) {
    cacheBlocks.push(
      <CacheBlock key={i} index={i} size={config.blockSize} isTop={i === 0} />,
    );
  }

  const ramBlocks = [];
  const svgLines = [];
  for (let i = 0; i < config.ramBlocks; i++) {
    ramBlocks.push(
      <RamBlock key={i} index={i} size={config.blockSize} isTop={i === 0} />,
    );

    // svgLines.push(
    //   <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
    //     <line
    //       x1={0}
    //       y1={(i % config.cacheBlocks) * 32 + 0.5}
    //       x2={113}
    //       y2={i * 32 + 0.5}
    //       stroke={
    //         config.cacheLines[i % config.cacheBlocks] === i
    //           ? "black"
    //           : "rgba(0, 0, 0, 0.15)"
    //       }
    //       strokeWidth={1}
    //     />
    //   </svg>,
    // );
  }

  const offset = getOffest(config.currentAddress, config.blockSize);

  return (
    <>
      <div className="absolute top-[25px] w-[53px]">
        <p className="text-center">CPU</p>
        <div className="h-[97px] w-[53px] border border-black"></div>
      </div>
      <div className="absolute top-[48px] left-[53px]">
        <p className="text-center">
          0x{config.currentAddress.toString(16).toUpperCase().padStart(2, "0")}
        </p>
        <Arrow direction="right" />
      </div>
      <div className="absolute top-[1px] left-[150px]">
        <p className="text-center">Cache</p>
        {/* CACHE */}
        <div className="grid grid-cols-[auto_0.5fr_0.5fr_1fr]">
          <div className="p-1"></div>
          <p className="text-center">Tag</p>
          <p className="text-center">V</p>
          <p className="text-center">Data</p>
          {cacheBlocks}
        </div>
      </div>
      {/* LINES */}
      {/* {svgLines} */}
      {/* RAM */}
      <div className="absolute top-[25px] left-[420px]">
        <p className="text-center">RAM</p>
        <div className="flex flex-col">{ramBlocks}</div>
      </div>
      {/* DETAILS */}
      <div
        className={cn(
          "absolute right-0 left-[632px]",
          debugging && "bg-purple-400",
        )}
      >
        <div>
          <p className="text-center">Address</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="px-1">Tag</p>
          <p className="px-1">Offset</p>
          <div id="tag" className="border px-1">
            {/* {tag
              .toString(2)
              .padStart(
                Math.floor(
                  Math.log2(Math.floor(config.ramBlocks / config.cacheBlocks)),
                ),
                "0",
              )} */}
          </div>
          <div id="offset" className="border-t border-r border-b px-1">
            {offset
              .toString(2)
              .padStart(Math.floor(Math.log2(config.blockSize)), "0")}
          </div>
        </div>
        <div className="flex gap-3 pt-2.5">
          <div className="flex gap-0.5">
            <p>Hits:</p>
            <p>{config.hits}</p>
          </div>
          <div className="flex gap-0.5">
            <p>Misses: </p>
            <p>{config.misses}</p>
          </div>
        </div>
        <div className="flex gap-0.5 pb-2.5">
          <p>Hit Ratio:</p>
          <p>
            {((config.hits / (config.hits + config.misses) || 0) * 100).toFixed(
              1,
            )}
            %
          </p>
        </div>
        <div>
          {initial ? (
            ""
          ) : config.wasHit ? (
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
    </>
  );
}
