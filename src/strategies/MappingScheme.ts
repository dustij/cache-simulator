import { DispatchAction, State } from "@/context/StateContext";

export interface MappingScheme {
  name: string;
  handleAddressClick(
    addr: number,
    state: State,
    dispath: React.Dispatch<DispatchAction>,
  ): void;
  getInitialCacheBlocks(state: State): number[];
}
