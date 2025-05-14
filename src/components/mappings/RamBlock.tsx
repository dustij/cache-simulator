"use client";

import { cn } from "@/lib/utils";
import { useContext } from "react";
import { CacheContext } from "../InteractiveArea";

export function RamBlock({
  index,
  size,
  isTop,
}: {
  index: number;
  size: number;
  isTop: boolean;
}) {
  const context = useContext(CacheContext);

  if (!context)
    throw new Error("DirectMapped must be used within a CacheProvider");

  const { config, setConfig, initial, setInitial } = context;

  function addToQueue() {
    if (!config.cacheQueue.containsValue(index)) {
      config.cacheQueue.offer(index, config.cacheBlocks);
    }

    if (config.cacheQueue.size() > config.cacheBlocks) {
      config.cacheQueue.poll();
    }
  }

  const blockData = [];
  for (let i = 0; i < size; i++) {
    blockData.push(
      <div
        key={i}
        className={cn(
          "group relative h-full",
          !initial && config.currentAddress == index * size + i
            ? "bg-zinc-900"
            : !initial && config.cacheQueue.containsValue(index)
              ? "bg-zinc-400"
              : "bg-zinc-300",
        )}
        data-tooltip={`Address: ${index * size + i}`}
        onClick={() => {
          setConfig({ ...config, currentAddress: index * size + i });
          initial && setInitial(false);
          addToQueue();
        }}
      >
        <div
          className={
            "absolute z-10 mb-1 hidden translate-x-11/12 rounded bg-black px-1 text-xs whitespace-nowrap text-white group-hover:block"
          }
        >
          Address: 0x
          {(index * size + i).toString(16).toUpperCase().padStart(2, "0")}
        </div>
      </div>,
    );
  }

  return (
    <div
      className={cn(
        "flex h-[32px] w-[70px] flex-col gap-[1px] border-r border-b border-l",
        isTop && "border-t",
        size > 4 && "gap-[0.5px]",
      )}
    >
      {blockData}
    </div>
  );
}
