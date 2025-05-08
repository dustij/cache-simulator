import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "flex flex-grow flex-col items-center gap-6 py-6",
        debugging ? "bg-amber-300" : "",
      )}
    >
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tighter text-balance text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Cache Simulator
        </h1>
      </header>
      <main
        className={cn(
          "min-h-[720px] min-w-[950px]",
          debugging ? "bg-green-300" : "",
        )}
      ></main>
    </div>
  );
}
