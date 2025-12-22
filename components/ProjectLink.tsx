import Link from "./Link";

export default function ProjectLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Link href={href} title={title} />
      <p className="tracking-normal text-neutral-500">{description}</p>
    </div>
  );
}
