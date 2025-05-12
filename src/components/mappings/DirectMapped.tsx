import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { Arrow } from "../Arrow";
import { CacheContext } from "../InteractiveArea";
import { CacheBlock } from "./CacheBlock";
import { RamBlock } from "./RamBlock";

export function DirectMapped() {
  const context = useContext(CacheContext);

  if (!context)
    throw new Error("DirectMapped must be used within a CacheProvider");

  const { config } = context;

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

    svgLines.push(
      <svg key={i} className="absolute top-[65px] left-[307px]" height={500}>
        <line
          x1={0}
          y1={(i % config.cacheBlocks) * 32 + 0.5}
          x2={113}
          y2={i * 32 + 0.5}
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth={1}
        />
      </svg>,
    );
  }

  const offsetBits = Math.floor(Math.log2(config.blockSize));
  const offsetMask = (1 << offsetBits) - 1;
  const offset = config.currentAddress & offsetMask;

  const blockBits = Math.floor(Math.log2(config.cacheBlocks));
  const blockMask = ((1 << offsetBits) << blockBits) - 1;
  const block = (config.currentAddress & blockMask) >>> offsetBits;

  const addressSize = Math.floor(
    Math.log2(config.blockSize * config.ramBlocks),
  );

  const tagBits = addressSize - blockBits - offsetBits;
  const tag = config.currentAddress >> (addressSize - tagBits);

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
        <div className="grid grid-cols-[auto_0.5fr_0.5fr_1fr]">
          <div className="p-1"></div>
          <p className="text-center">Tag</p>
          <p className="text-center">V</p>
          <p className="text-center">Data</p>
          {cacheBlocks}
        </div>
      </div>
      {svgLines}
      <div className="absolute top-[25px] left-[420px]">
        <p className="text-center">RAM</p>
        <div className="flex flex-col">{ramBlocks}</div>
      </div>
      <div
        className={cn("absolute left-[620px]", debugging && "bg-purple-400")}
      >
        <div>
          <p className="text-center">Address</p>
        </div>
        <div className="grid grid-cols-3">
          <p className="px-1">Tag</p>
          <p className="px-1">Block</p>
          <p className="px-1">Offset</p>
          <div id="tag" className="border px-1">
            {tag.toString(2).padStart(tagBits, "0")}
          </div>
          <div id="block" className="border-t border-b px-1">
            {block.toString(2).padStart(blockBits, "0")}
          </div>
          <div id="offset" className="border px-1">
            {offset.toString(2).padStart(offsetBits, "0")}
          </div>
        </div>
        <div className="flex gap-3 pt-2.5">
          <div className="flex gap-0.5">
            <p>Hits:</p>
            <p>0</p>
          </div>
          <div className="flex gap-0.5">
            <p>Misses: </p>
            <p>0</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          <p>Hit Ratio:</p>
          <p>0.0%</p>
        </div>
      </div>
    </>
  );
}
