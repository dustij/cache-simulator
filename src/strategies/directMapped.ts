import { DispatchAction, State } from "@/context/StateContext";
import { MappingScheme } from "./MappingScheme";

export const directMapped: MappingScheme = {
  name: "DIRECT_MAPPED",
  handleAddressClick: function (
    addr: number,
    state: State,
    dispath: React.Dispatch<DispatchAction>,
  ): void {
    throw new Error("Function not implemented.");
  },
  getInitialCacheBlocks: function (state: State): number[] {
    throw new Error("Function not implemented.");
  },
};
