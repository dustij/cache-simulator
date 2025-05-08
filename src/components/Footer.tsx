import { debugging } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer
      className={cn(
        "flex min-h-12 flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:px-8 lg:px-12",
        debugging ? "bg-red-300" : "",
      )}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Dusti Johnson. All rights reserved.
      </p>
    </footer>
  );
}
