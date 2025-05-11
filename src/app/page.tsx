import { InteractiveArea } from "@/components/InteractiveArea";
import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "flex flex-grow flex-col gap-6 py-6 lg:items-center",
        debugging ? "bg-amber-300" : "",
      )}
    >
      <header className="">
        <h1 className="text-center text-4xl font-bold tracking-tighter text-balance sm:text-5xl">
          Cache Simulator
        </h1>
      </header>
      <InteractiveArea />
    </div>
  );
}
