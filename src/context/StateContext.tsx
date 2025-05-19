import { directMapped } from "@/strategies/directMapped";
import { fullAssociative } from "@/strategies/fullyAssociate";
import { MappingScheme } from "@/strategies/MappingScheme";
import { setAssociate } from "@/strategies/setAssociative";
import { createContext, ReactNode, useReducer } from "react";

// ---------- Types ----------
export interface State {
  ramBlocksCount: number;
  cacheBlocksCount: number;
  blockSize: number;
  nWay: number;
  scheme: MappingScheme;
  totalHits: number;
  totalMisses: number;
  currentAddress: number;
  lastVictim: number | null;
  cacheBlocks: number[];
}

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
  | { type: "LOAD_FULLY_BLOCK" }
  | { type: "LOAD_SET_BLOCK" };

// ---------- Context ----------
export const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<DispatchAction>;
}>(null!);

// ---------- Reducer ----------
function reducer(state: State, action: DispatchAction): State {
  const clearedValues = {
    currentAddress: 0,
    cacheBlocks: [],
    lastVictim: null,
    totalHits: 0,
    totalMisses: 0,
  };

  switch (action.type) {
    case "SET_DIRECT_SCHEME":
      return { ...state, ...clearedValues, scheme: directMapped };
    case "SET_FULLY_SCHEME":
      return { ...state, ...clearedValues, scheme: fullAssociative };
    case "SET_SET_SCHEME":
      return { ...state, ...clearedValues, scheme: setAssociate };
    case "RAM_BLOCKS_TO_4":
      return { ...state, ...clearedValues, ramBlocksCount: 4 };
    case "RAM_BLOCKS_TO_8":
      return { ...state, ...clearedValues, ramBlocksCount: 8 };
    case "RAM_BLOCKS_TO_16":
      return { ...state, ...clearedValues, ramBlocksCount: 16 };
    case "CACHE_BLOCKS_TO_2":
      return { ...state, ...clearedValues, cacheBlocksCount: 2 };
    case "CACHE_BLOCKS_TO_4":
      return { ...state, ...clearedValues, cacheBlocksCount: 4 };
    case "CACHE_BLOCKS_TO_8":
      return { ...state, ...clearedValues, cacheBlocksCount: 8 };
    case "NWAY_TO_2":
      return { ...state, ...clearedValues, nWay: 2 };
    case "NWAY_TO_4":
      return { ...state, ...clearedValues, nWay: 4 };
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
        totalHits: state.totalHits + (hit ? 1 : 0),
        totalMisses: state.totalMisses + (hit ? 0 : 1),
      };
    }
    case "RESET":
      return {
        ...state,
        ...clearedValues,
      };
    case "LOAD_FULLY_BLOCK":
    case "LOAD_SET_BLOCK":
    default:
      return state;
  }
}

// ---------- Provider -----------
export function StateProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: State;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
