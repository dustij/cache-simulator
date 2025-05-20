"use client";

import { State, StateContext, StateProvider } from "@/context/StateContext";
import { directMapped } from "@/context/strategies/directMapped";
import { fullAssociative } from "@/context/strategies/fullyAssociate";
import { setAssociate } from "@/context/strategies/setAssociative";
import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChangeEvent, useContext } from "react";
import InnerView from "./InnerView";

function Content() {
  const { state, dispatch } = useContext(StateContext);

  function handleChangeRamBlocksCount(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case "4":
        return dispatch({ type: "RAM_BLOCKS_TO_4" });
      case "8":
        return dispatch({ type: "RAM_BLOCKS_TO_8" });
      case "16":
        return dispatch({ type: "RAM_BLOCKS_TO_16" });
      default:
        throw Error("Default case hit when it shouldn't");
    }
  }

  function handleChangeCacheBlocksCount(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case "2":
        return dispatch({ type: "CACHE_BLOCKS_TO_2" });
      case "4":
        return dispatch({ type: "CACHE_BLOCKS_TO_4" });
      case "8":
        return dispatch({ type: "CACHE_BLOCKS_TO_8" });
      default:
        throw Error("Default case hit when it shouldn't");
    }
  }

  function handleChangeNWay(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case "2":
        return dispatch({ type: "NWAY_TO_2" });
      case "4":
        return dispatch({ type: "NWAY_TO_4" });
      default:
        throw Error("Default case hit when it shouldn't");
    }
  }

  function handleChangeBlockSize(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case "2":
        return dispatch({ type: "BLOCK_SIZE_TO_2" });
      case "4":
        return dispatch({ type: "BLOCK_SIZE_TO_4" });
      case "8":
        return dispatch({ type: "BLOCK_SIZE_TO_8" });
      case "16":
        return dispatch({ type: "BLOCK_SIZE_TO_16" });
      default:
        throw Error("Default case hit when it shouldn't");
    }
  }

  function handleClickReset() {
    dispatch({ type: "RESET" });
  }

  function handleClickDirectMapped() {
    dispatch({ type: "SET_DIRECT_SCHEME" });
  }

  function handleClickFullyAssociative() {
    dispatch({ type: "SET_FULLY_SCHEME" });
  }

  function handleClickSetAssociative() {
    dispatch({ type: "SET_SET_SCHEME" });
  }

  return (
    <main className={cn("flex-1 overflow-x-auto")}>
      <div
        className={cn(
          "mx-auto flex min-h-[720px] min-w-[950px] flex-col items-center gap-2",
          debugging && "bg-green-300",
        )}
      >
        <div className={cn("flex gap-6", debugging && "bg-violet-300")}>
          <div className="flex gap-2">
            <label htmlFor="ram-blocks-count">Ram Blocks:</label>
            <select
              name="ram-blocks-count"
              value={state.ramBlocksCount}
              onChange={handleChangeRamBlocksCount}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="cache-blocks-count">Cache Blocks:</label>
            <select
              name="cache-block-count"
              value={state.cacheBlocksCount}
              onChange={handleChangeCacheBlocksCount}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="n-way">N-Way:</label>
            <select name="n-way" value={state.nWay} onChange={handleChangeNWay}>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label htmlFor="block-size">Block Size:</label>
            <select
              name="block-size"
              value={state.blockSize}
              onChange={handleChangeBlockSize}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
          <button id="reset" onClick={handleClickReset}>
            Reset
          </button>
        </div>
        <div className={cn(debugging && "bg-pink-300")}>
          <div>
            <button
              className={cn(
                "radio-button left",
                state.scheme === directMapped && "selected",
              )}
              onClick={handleClickDirectMapped}
            >
              Direct Mapped
            </button>
            <button
              className={cn(
                "radio-button center",
                state.scheme === fullAssociative && "selected",
              )}
              onClick={handleClickFullyAssociative}
            >
              Fully Associative
            </button>
            <button
              className={cn(
                "radio-button right",
                state.scheme === setAssociate && "selected",
              )}
              onClick={handleClickSetAssociative}
            >
              Set Associative
            </button>
          </div>
        </div>
        <div
          className={cn("flex w-full flex-grow", debugging && "bg-teal-300")}
        >
          <InnerView />
        </div>
      </div>
    </main>
  );
}

export default function OuterView() {
  const initialState: State = {
    wasHit: false,
    totalHits: 0,
    totalMisses: 0,
    currentAddress: 0,
    lastVictim: null,
    ramBlocksCount: 4,
    cacheBlocksCount: 2,
    nWay: 2,
    blockSize: 2,
    scheme: directMapped,
    cacheBlocks: [],
  };

  return (
    <StateProvider initialState={initialState}>
      <Content />
    </StateProvider>
  );
}
