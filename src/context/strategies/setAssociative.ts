import { State } from "@/context/StateContext";
import { DispatchAction } from "../stateReducer";
import { MappingScheme } from "./mappingScheme";

export const setAssociate: MappingScheme = {
  name: "SET_ASSOCIATIVE",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void {
    const blockIndex = Math.floor(addr / state.blockSize);
    dispatch({
      type: "LOAD_SET_BLOCK",
      address: addr,
      blockIndex: blockIndex,
    });
  },
};
