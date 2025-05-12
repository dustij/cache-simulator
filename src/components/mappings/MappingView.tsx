import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MappingView({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative mt-2 flex flex-grow border-1 p-8",
        debugging && "bg-lime-300",
      )}
    >
      <div
        className={cn("relative flex flex-grow", debugging && "bg-lime-500")}
      >
        {children}
      </div>
    </div>
  );
}
