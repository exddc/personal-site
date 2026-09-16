import Link from "next/link";

export default function NotFound() {
  return (
    <section className="reveal-stagger flex min-h-[55vh] flex-col justify-center gap-12 py-8 sm:gap-16 sm:py-16">
      <header className="flex flex-col gap-5">
        <p className="text-accent font-mono text-sm tracking-tight">
          404 / page not found
        </p>
        <h1 className="text-foreground max-w-4xl text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl">
          You might be looking
          <br />
          <span className="text-neutral-400">at the wrong place.</span>
        </h1>
      </header>

      <div className="flex flex-col items-start justify-between gap-8 border-t border-neutral-300 pt-6 sm:flex-row sm:items-end">
        <p className="max-w-lg text-lg leading-snug text-neutral-500 sm:text-xl">
          This is a single page, I don&apos;t know how you got lost...
        </p>
        <Link
          href="/"
          className="group text-foreground hover:text-accent focus-visible:text-accent focus-visible:outline-accent flex w-fit shrink-0 items-center gap-2 font-mono text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          >
            ←
          </span>
          Back to home
        </Link>
      </div>
    </section>
  );
}
