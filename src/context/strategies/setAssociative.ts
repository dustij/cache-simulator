import { State } from "@/context/StateContext";
import { DispatchAction } from "../stateReducer";
import { MappingScheme } from "./MappingScheme";

export const setAssociate: MappingScheme = {
  name: "SET_ASSOCIATIVE",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void {
    const blockIndex = Math.floor(addr / state.blockSize);
    const cacheIndex = blockIndex % state.cacheBlocksCount;
    dispatch({
      type: "LOAD_SET_BLOCK",
      address: addr,
      cacheIndex: cacheIndex,
      blockIndex: blockIndex,
    });
  },
};
