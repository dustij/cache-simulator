import { StateContext } from "@/context/StateContext";
import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import DirectMapped from "./scheme/DirectMapped";
import FullyAssociative from "./scheme/FullyAssociative";
import SetAssociative from "./scheme/SetAssociative";

export default function InnerView() {
  const { state } = useContext(StateContext);

  const views = {
    DIRECT_MAPPED: <DirectMapped />,
    FULLY_ASSOCIATIVE: <FullyAssociative />,
    SET_ASSOCIATIVE: <SetAssociative />,
  };

  const activeView = views[state.scheme.name as keyof typeof views];

  return (
    <div
      className={cn(
        "relative mt-2 flex flex-grow border-1 px-10 py-8",
        debugging && "bg-lime-300",
      )}
    >
      <div
        className={cn("relative flex flex-grow", debugging && "bg-lime-500")}
      >
        {activeView}
      </div>
    </div>
  );
}
