import { cn } from "@/lib/utils";

interface blockData {
  // not using yet
  address: number;
}

export function RamBlock({
  index,
  size,
  isTop,
}: {
  index: number;
  size: number;
  isTop: boolean;
}) {
  const blockData = [];
  for (let i = 0; i < size; i++) {
    blockData.push(<div key={i} className="h-full bg-zinc-300"></div>);
  }

  return (
    <div
      className={cn(
        "flex h-[2rem] w-[70px] flex-col gap-[1px] border-r border-b border-l",
        isTop && "border-t",
        size === 16 && "gap-[0.5px]",
      )}
    >
      {blockData}
    </div>
  );
}
