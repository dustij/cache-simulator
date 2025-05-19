import { DispatchAction, State } from "@/context/StateContext";

export interface MappingScheme {
  name: string;
  handleAddressClick(
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void;
}
