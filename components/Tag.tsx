// Libraries
import { cn } from "@/lib/utils";

// Types
interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: Props) {
  return (
    <span
      className={cn(
        "rounded border border-neutral-400 bg-transparent px-3 py-1 font-mono text-xs text-neutral-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
