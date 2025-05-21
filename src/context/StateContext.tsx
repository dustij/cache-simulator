import { createContext, ReactNode, useReducer } from "react";
import { DispatchAction, reducer } from "./stateReducer";
import { MappingScheme } from "./strategies/MappingScheme";

export interface State {
  numRamBlocks: number;
  numCacheBlocks: number;
  blockSize: number;
  nWay: number;
  scheme: MappingScheme;
  wasHit: boolean;
  totalHits: number;
  totalMisses: number;
  currentAddress: number;
  lastVictim: number | null;
  cacheBlocks: number[];
  cacheQueue: number[];
  headPointers: number[];
}

export const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<DispatchAction>;
}>(null!);

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
