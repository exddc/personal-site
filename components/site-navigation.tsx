const navigation = [
  { href: "/", label: "home" },
  { href: "/#apps", label: "apps" },
  { href: "/#projects", label: "projects" },
  { href: "/#socials", label: "socials" },
] as const;

export function SiteNavigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="reveal flex gap-6 font-mono text-sm tracking-tight text-neutral-500 sm:gap-14"
    >
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`hover:text-accent focus-visible:text-accent focus-visible:outline-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none ${item.href === "/" ? "text-accent" : ""}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
