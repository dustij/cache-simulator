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

  const { config, mapping } = context;

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
      <svg key={i} className="absolute top-[65px] left-[307px]" height={900}>
        <line
          x1={0}
          y1={(i % 2) * 31 + 0.5}
          x2={113}
          y2={i * 32 + 0.5}
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth={1}
        />
      </svg>,
    );
  }

  return (
    <>
      <div className="absolute top-[25px] w-[53px]">
        <p className="text-center">CPU</p>
        <div className="h-[97px] w-[53px] border border-black"></div>
      </div>
      <div className="absolute top-[48px] left-[53px]">
        <p className="text-center">0x00</p>
        <Arrow direction="right" />
      </div>
      <div className="absolute left-[150px]">
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
          <div className="border px-1">0</div>
          <div className="border-t border-b px-1">0</div>
          <div className="border px-1">0</div>
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
