import { DispatchAction, State } from "@/context/StateContext";
import { MappingScheme } from "./MappingScheme";

export const fullAssociative: MappingScheme = {
  name: "FULLY_ASSOCIATIVE",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void {
    throw new Error("Function not implemented.");
  },
};
