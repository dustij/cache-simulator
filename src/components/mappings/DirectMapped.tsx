import { useContext } from "react";
import { Arrow } from "../Arrow";
import { CacheContext } from "../InteractiveArea";
import { Block } from "./Block";

export function DirectMapped() {
  const context = useContext(CacheContext);

  if (!context)
    throw new Error("DirectMapped must be used within a CacheProvider");

  const { config, mapping } = context;

  const cacheBlocks = [];
  for (let i = 0; i < config.cacheBlocks; i++) {
    cacheBlocks.push(
      <Block key={i} index={i} size={config.blockSize} isTop={i === 0} />,
    );
  }

  return (
    <>
      <div className="absolute top-[34px] w-[53px]">
        <p className="text-center">CPU</p>
        <div className="h-[97px] w-[53px] border border-black"></div>
      </div>
      <div className="absolute top-[57px] left-[53px]">
        <p className="text-center">0x00</p>
        <Arrow direction="right" />
      </div>
      <div className="absolute left-[150px]">
        <p className="text-center">Cache</p>
        <div className="grid grid-cols-[auto_0.5fr_0.5fr_1fr]">
          <div className="p-1"></div>
          <div className="p-1 text-center">Tag</div>
          <div className="p-1 text-center">V</div>
          <div className="p-1 text-center">Data</div>
          {cacheBlocks}
        </div>
      </div>
    </>
  );
}
