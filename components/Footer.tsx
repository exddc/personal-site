// Components
import Link from "@/components/Link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-neutral-300 pt-12 pb-12 font-mono text-xs text-neutral-400">
      <span>© {new Date().getFullYear()} Timo Weiss</span>
      <span className="flex items-center gap-2">
        Full-stack developer at{" "}
        <Link
          href="https://hmmc.io"
          title="HMMC"
          className="text-xs"
          showArrow={false}
        />
      </span>
    </footer>
  );
}
