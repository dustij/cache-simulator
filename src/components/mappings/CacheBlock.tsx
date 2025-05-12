import { cn } from "@/lib/utils";

interface blockData {
  // not using yet
  address: number;
}

export function CacheBlock({
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
    <>
      <div className="flex items-center justify-center px-1 text-center">
        {index}
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          isTop && "border-t",
        )}
      >
        0
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          isTop && "border-t",
        )}
      >
        0
      </div>
      <div
        className={cn(
          "flex h-[32px] w-[70px] flex-col gap-[1px] border-r border-b border-l",
          isTop && "border-t",
          size === 16 && "gap-[0.5px]",
        )}
      >
        {blockData}
      </div>
    </>
  );
}
