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
    throw new Error("Function not implemented.");
  },
};
