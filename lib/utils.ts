import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const UTM_MEDIUM = "portfolio_website";
const UTM_CAMPAIGN = "project_click";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildProjectOutboundUrl(href: string, projectSlug: string) {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(href);
  } catch {
    return href;
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return href;
  }

  parsedUrl.searchParams.set("utm_source", "timoweiss_me_landing_page");
  parsedUrl.searchParams.set("utm_medium", UTM_MEDIUM);
  parsedUrl.searchParams.set("utm_campaign", UTM_CAMPAIGN);

  parsedUrl.searchParams.set("utm_content", projectSlug);

  return parsedUrl.toString();
}
