import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MappingView({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative m-6 flex flex-grow border-1",
        debugging ? "bg-lime-300" : "",
      )}
    >
      {children}
    </div>
  );
}
