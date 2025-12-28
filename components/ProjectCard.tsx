"use client";

// Components
import NextLink from "next/link";
import NextImage from "next/image";
import Tag from "@/components/Tag";

// Types
interface Props {
  href: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  onTagClick?: (tech: string) => void;
}

export default function ProjectCard({
  href,
  title,
  description,
  image,
  technologies,
  onTagClick,
}: Props) {
  return (
    <div className="group flex h-full flex-col gap-4">
      <NextLink href={href}>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-neutral-50">
          <NextImage
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </NextLink>

      <div className="flex h-full flex-col justify-between gap-2">
        <NextLink href={href}>
          <h3 className="text-foreground group-hover:text-accent text-2xl font-medium transition-colors">
            {title}
          </h3>
        </NextLink>
        <p className="text-neutral-500">{description}</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {technologies.map((tech) =>
            onTagClick ? (
              <button
                key={tech}
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(tech);
                }}
              >
                <Tag className="hover:cursor-pointer hover:bg-neutral-200">
                  {tech}
                </Tag>
              </button>
            ) : (
              <Tag key={tech}>{tech}</Tag>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
