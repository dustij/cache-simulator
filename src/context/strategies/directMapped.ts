import { State } from "@/context/StateContext";
import { DispatchAction } from "../stateReducer";
import { MappingScheme } from "./mappingScheme";

export const directMapped: MappingScheme = {
  name: "DIRECT_MAPPED",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void {
    const blockIndex = Math.floor(addr / state.blockSize);
    const cacheIndex = blockIndex % state.numCacheBlocks;
    dispatch({
      type: "LOAD_DIRECT_BLOCK",
      address: addr,
      cacheIndex: cacheIndex,
      blockIndex: blockIndex,
    });
  },
};
