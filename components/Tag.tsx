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
        "rounded bg-neutral-200 px-3 py-1 font-mono text-xs text-neutral-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
