import { State } from "@/context/StateContext";
import { DispatchAction } from "../stateReducer";

export type schemeVariants = "direct" | "fully" | "set";

export interface MappingScheme {
  name: string;
  handleAddressClick(
    addr: number,
    state: State,
    dispatch: React.Dispatch<DispatchAction>,
  ): void;
}
