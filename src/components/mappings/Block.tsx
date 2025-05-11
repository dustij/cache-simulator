import { cn } from "@/lib/utils";

export function Block({ isTop }: { isTop: boolean }) {
  return (
    <>
      <div className="flex items-center justify-center p-1 text-center">0</div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l p-1 text-center",
          isTop && "border-t",
        )}
      >
        0
      </div>
      <div
        className={cn(
          "flex items-center justify-center border-b border-l p-1 text-center",
          isTop && "border-t",
        )}
      >
        0
      </div>
      <div
        className={cn(
          "w-[70px] border-r border-b border-l bg-gray-300",
          isTop && "border-t",
        )}
      ></div>
    </>
  );
}
