import { cn } from "@/lib/utils";

export default function CacheBlock({
  index,
  size,
}: {
  index: number;
  size: number;
}) {
  return (
    <>
      <div className="flex items-center justify-center px-1 text-center">?</div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          index === 0 && "border-t",
        )}
      >
        ??
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l px-1 text-center",
          index === 0 && "border-t",
        )}
      >
        ?
      </div>
      <div
        className={cn(
          "flex h-[32px] w-[70px] flex-col gap-[1px] border-r border-b border-l",
          index === 0 && "border-t",
          0 > 4 && "gap-[0.5px]", // todo: change 0 to the size of the block
        )}
      >
        ???
      </div>
    </>
  );
}
