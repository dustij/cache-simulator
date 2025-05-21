import { State } from "./StateContext";
import { directMapped } from "./strategies/directMapped";
import { fullAssociative } from "./strategies/fullyAssociate";
import { setAssociate } from "./strategies/setAssociative";

export type DispatchAction =
  | { type: "RESET" }
  | { type: "SET_DIRECT_SCHEME" }
  | { type: "SET_FULLY_SCHEME" }
  | { type: "SET_SET_SCHEME" }
  | { type: "RAM_BLOCKS_TO_4" }
  | { type: "RAM_BLOCKS_TO_8" }
  | { type: "RAM_BLOCKS_TO_16" }
  | { type: "CACHE_BLOCKS_TO_2" }
  | { type: "CACHE_BLOCKS_TO_4" }
  | { type: "CACHE_BLOCKS_TO_8" }
  | { type: "NWAY_TO_2" }
  | { type: "NWAY_TO_4" }
  | { type: "BLOCK_SIZE_TO_2" }
  | { type: "BLOCK_SIZE_TO_4" }
  | { type: "BLOCK_SIZE_TO_8" }
  | { type: "BLOCK_SIZE_TO_16" }
  | {
      type: "LOAD_DIRECT_BLOCK";
      address: number;
      cacheIndex: number;
      blockIndex: number;
    }
  | {
      type: "LOAD_FULLY_BLOCK";
      address: number;
      blockIndex: number;
      maxQueueLength: number;
    }
  | {
      type: "LOAD_SET_BLOCK";
      address: number;
      blockIndex: number;
    };

export function reducer(state: State, action: DispatchAction): State {
  const clearedValues = {
    currentAddress: 0,
    cacheBlocks: [],
    cacheQueue: [],
    headPointers: Array(Math.floor(state.numCacheBlocks / state.nWay)).fill(0),
    lastVictim: null,
    totalHits: 0,
    totalMisses: 0,
  };

  let victim: number | null = null;
  let cacheBlocks: number[] = [];

  switch (action.type) {
    case "SET_DIRECT_SCHEME":
      return { ...state, ...clearedValues, scheme: directMapped };
    case "SET_FULLY_SCHEME":
      return { ...state, ...clearedValues, scheme: fullAssociative };
    case "SET_SET_SCHEME":
      return { ...state, ...clearedValues, scheme: setAssociate };
    case "RAM_BLOCKS_TO_4":
      return { ...state, ...clearedValues, numRamBlocks: 4 };
    case "RAM_BLOCKS_TO_8":
      return { ...state, ...clearedValues, numRamBlocks: 8 };
    case "RAM_BLOCKS_TO_16":
      return { ...state, ...clearedValues, numRamBlocks: 16 };
    case "CACHE_BLOCKS_TO_2":
      return {
        ...state,
        ...clearedValues,
        numCacheBlocks: 2,
        headPointers: Array(Math.floor(2 / state.nWay)).fill(0),
      };
    case "CACHE_BLOCKS_TO_4":
      return {
        ...state,
        ...clearedValues,
        numCacheBlocks: 4,
        headPointers: Array(Math.floor(4 / state.nWay)).fill(0),
      };
    case "CACHE_BLOCKS_TO_8":
      return {
        ...state,
        ...clearedValues,
        numCacheBlocks: 8,
        headPointers: Array(Math.floor(8 / state.nWay)).fill(0),
      };
    case "NWAY_TO_2":
      return {
        ...state,
        ...clearedValues,
        nWay: 2,
        headPointers: Array(Math.floor(state.numCacheBlocks / 2)).fill(0),
      };
    case "NWAY_TO_4":
      return {
        ...state,
        ...clearedValues,
        nWay: 4,
        headPointers: Array(Math.floor(state.numCacheBlocks / 4)).fill(0),
      };
    case "BLOCK_SIZE_TO_2":
      return { ...state, ...clearedValues, blockSize: 2 };
    case "BLOCK_SIZE_TO_4":
      return { ...state, ...clearedValues, blockSize: 4 };
    case "BLOCK_SIZE_TO_8":
      return { ...state, ...clearedValues, blockSize: 8 };
    case "BLOCK_SIZE_TO_16":
      return { ...state, ...clearedValues, blockSize: 16 };

    case "LOAD_DIRECT_BLOCK": {
      const cacheBlocks = [...state.cacheBlocks];
      const hit = cacheBlocks[action.cacheIndex] === action.blockIndex;
      const victim = !hit ? cacheBlocks[action.cacheIndex] : null;
      cacheBlocks[action.cacheIndex] = action.blockIndex;
      return {
        ...state,
        currentAddress: action.address,
        cacheBlocks: cacheBlocks,
        lastVictim: victim,
        wasHit: hit,
        totalHits: state.totalHits + (hit ? 1 : 0),
        totalMisses: state.totalMisses + (hit ? 0 : 1),
      };
    }

    case "LOAD_FULLY_BLOCK":
      if (state.cacheBlocks.includes(action.blockIndex)) {
        // hit
        return {
          ...state,
          currentAddress: action.address,
          lastVictim: victim,
          wasHit: true,
          totalHits: state.totalHits + 1,
        };
      }

      // miss
      cacheBlocks = [...state.cacheBlocks];
      const cacheQueue = [...state.cacheQueue];
      cacheQueue.push(action.blockIndex);

      if (cacheQueue.length <= action.maxQueueLength) {
        cacheBlocks.push(action.blockIndex);
      } else {
        const evictSlot = cacheBlocks.indexOf(cacheQueue[0]);
        victim = cacheBlocks[evictSlot];
        cacheBlocks[evictSlot] = action.blockIndex;
        cacheQueue.shift();
      }

      return {
        ...state,
        currentAddress: action.address,
        cacheBlocks: cacheBlocks,
        cacheQueue: cacheQueue,
        lastVictim: victim,
        wasHit: false,
        totalMisses: state.totalMisses + 1,
      };

    case "LOAD_SET_BLOCK":
      // compute set
      const blockNumber = Math.floor(action.address / state.blockSize);
      const numSets = Math.floor(state.numCacheBlocks / state.nWay);
      const setIndex = blockNumber % numSets;

      const baseSlot = setIndex * state.nWay;
      const waysSlots = state.cacheBlocks.slice(
        baseSlot,
        baseSlot + state.nWay,
      );

      if (waysSlots.includes(action.blockIndex)) {
        // hit
        return {
          ...state,
          currentAddress: action.address,
          lastVictim: victim,
          wasHit: true,
          totalHits: state.totalHits + 1,
        };
      }

      // miss
      cacheBlocks = [...state.cacheBlocks];

      const evictWay = state.headPointers[setIndex];
      const victimSlot = baseSlot + evictWay;
      victim = cacheBlocks[victimSlot];

      const newBlocks = [...cacheBlocks];
      newBlocks[victimSlot] = action.blockIndex;

      // advance FIFO pointer for that set
      const newHeads = [...state.headPointers];
      newHeads[setIndex] = (evictWay + 1) % state.nWay;

      return {
        ...state,
        currentAddress: action.address,
        cacheBlocks: newBlocks,
        headPointers: newHeads,
        lastVictim: victim,
        wasHit: false,
        totalMisses: state.totalMisses + 1,
      };

    case "RESET":
      return {
        ...state,
        ...clearedValues,
      };
    default:
      return state;
  }
}
