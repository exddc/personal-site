import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type ProjectLinkPlacement =
  | "landing_page"
  | "projects_page"
  | "project_detail_page";

interface ProjectLinkParams {
  placement: ProjectLinkPlacement;
  projectSlug?: string;
}

const UTM_MEDIUM = "portfolio_website";
const UTM_CAMPAIGN = "project_click";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function buildProjectOutboundUrl(
  href: string,
  { placement, projectSlug }: ProjectLinkParams,
): string {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(href);
  } catch {
    return href;
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return href;
  }

  parsedUrl.searchParams.set("utm_source", `timoweiss_me_${placement}`);
  parsedUrl.searchParams.set("utm_medium", UTM_MEDIUM);
  parsedUrl.searchParams.set("utm_campaign", UTM_CAMPAIGN);

  if (projectSlug) {
    parsedUrl.searchParams.set("utm_content", projectSlug);
  }

  return parsedUrl.toString();
}
