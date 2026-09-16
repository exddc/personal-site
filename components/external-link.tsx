interface ExternalLinkProps {
  href: string;
  children: string;
  className?: string;
  showArrow?: boolean;
}

export function ExternalLink({
  href,
  children,
  className = "",
  showArrow = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group text-foreground hover:text-accent focus-visible:text-accent focus-visible:outline-accent flex w-fit items-center gap-2 font-mono text-base transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none ${className}`}
    >
      {showArrow ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45 motion-reduce:transform-none motion-reduce:transition-none"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      ) : null}
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        />
      </span>
    </a>
  );
}
