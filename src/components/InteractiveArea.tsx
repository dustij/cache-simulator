"use client";

import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createContext, useEffect, useState } from "react";
import { DirectMapped } from "./mappings/DirectMapped";
import { FullyAssociative } from "./mappings/FullyAssociative";
import { MappingView } from "./mappings/MappingView";
import { SetAssociative } from "./mappings/SetAssociative";

interface CacheConfig {
  ramBlocks: number;
  cacheBlocks: number;
  nWay: number;
  blockSize: number;
}

interface CacheContextType {
  config: CacheConfig;
  mapping: "direct" | "fully" | "set";
}

export const CacheContext = createContext<CacheContextType | null>(null);

export function InteractiveArea() {
  const [mapping, setMapping] = useState<"direct" | "fully" | "set">("direct");
  const [config, setConfig] = useState<CacheConfig>({
    ramBlocks: 4,
    cacheBlocks: 2,
    nWay: 2,
    blockSize: 2,
  });

  useEffect(() => {
    console.log(config);
  }, [config]);

  const views = {
    direct: <DirectMapped />,
    fully: <FullyAssociative />,
    set: <SetAssociative />,
  };

  return (
    <main className={cn("flex-1 overflow-x-auto")}>
      <div
        className={cn(
          "mx-auto flex min-h-[720px] min-w-[950px] flex-col items-center gap-2",
          debugging && "bg-green-300",
        )}
      >
        {/* config settings */}
        <div className={cn("flex gap-6", debugging && "bg-violet-300")}>
          <div className="flex gap-2">
            <label htmlFor="ram-blocks">Ram Blocks:</label>
            <select
              name="ram-blocks"
              id="ram-blocks"
              value={config.ramBlocks}
              onChange={(el) =>
                setConfig((prev) => ({
                  ...prev,
                  ramBlocks: Number(el.target.value),
                }))
              }
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="cache-blocks">Cache Blocks:</label>
            <select
              name="cache-blocks"
              id="cache-blocks"
              value={config.cacheBlocks}
              onChange={(el) =>
                setConfig((prev) => ({
                  ...prev,
                  cacheBlocks: Number(el.target.value),
                }))
              }
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="n-way">N-Way:</label>
            <select
              name="n-way"
              id="n-way"
              value={config.nWay}
              onChange={(el) =>
                setConfig((prev) => ({
                  ...prev,
                  nWay: Number(el.target.value),
                }))
              }
            >
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="block-size">Block Size:</label>
            <select
              name="block-size"
              id="block-size"
              value={config.blockSize}
              onChange={(el) =>
                setConfig((prev) => ({
                  ...prev,
                  blockSize: Number(el.target.value),
                }))
              }
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
          <button
            id="reset"
            onClick={() => {
              setConfig({
                ramBlocks: 4,
                cacheBlocks: 2,
                nWay: 2,
                blockSize: 2,
              });
            }}
          >
            Reset
          </button>
        </div>
        {/* config scheme */}
        <div className={cn(debugging && "bg-pink-300")}>
          <div>
            <button
              className={cn(
                "radio-button left",
                mapping === "direct" ? "selected" : "",
              )}
              onClick={() => setMapping("direct")}
            >
              Direct Mapped
            </button>
            <button
              className={cn(
                "radio-button center",
                mapping === "fully" ? "selected" : "",
              )}
              onClick={() => setMapping("fully")}
            >
              Fully Associative
            </button>
            <button
              className={cn(
                "radio-button right",
                mapping === "set" ? "selected" : "",
              )}
              onClick={() => setMapping("set")}
            >
              Set Associative
            </button>
          </div>
        </div>
        <div
          className={cn("flex w-full flex-grow", debugging && "bg-teal-300")}
        >
          <CacheContext.Provider value={{ config, mapping }}>
            <MappingView>{views[mapping] ?? null}</MappingView>
          </CacheContext.Provider>
        </div>
      </div>
    </main>
  );
}
