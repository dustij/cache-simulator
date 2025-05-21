import { State } from "@/context/StateContext";
import { DispatchAction } from "../stateReducer";
import { MappingScheme } from "./MappingScheme";

export const fullAssociative: MappingScheme = {
  name: "FULLY_ASSOCIATIVE",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void {
    const blockIndex = Math.floor(addr / state.blockSize);
    dispatch({
      type: "LOAD_FULLY_BLOCK",
      address: addr,
      blockIndex: blockIndex,
      maxQueueLength: state.numCacheBlocks,
    });
  },
};
