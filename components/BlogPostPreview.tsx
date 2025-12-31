// Components
import NextLink from "next/link";

// Types
interface Props {
  href: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
}

export default function BlogPostPreview({
  href,
  title,
  description,
  date,
  readingMinutes,
}: Props) {
  return (
    <NextLink href={href} className="group block">
      <h3 className="group-hover:text-accent text-2xl transition-colors">
        {title}
      </h3>
      <p className="text-gray-500">{description}</p>
      <span className="font-mono text-xs tracking-tight text-neutral-500">
        {date} | {readingMinutes} min read
      </span>
    </NextLink>
  );
}
