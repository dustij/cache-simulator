import { DispatchAction, State } from "@/context/StateContext";
import { MappingScheme } from "./MappingScheme";

export const fullAssociative: MappingScheme = {
  name: "FULLY_ASSOCIATIVE",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispath: React.Dispatch<DispatchAction>,
  ): void {
    throw new Error("Function not implemented.");
  },
  getInitialCacheBlocks: function (state: State): Array<number | null> {
    throw new Error("Function not implemented.");
  },
};
