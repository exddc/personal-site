const TRACKING_PARAMETERS = {
  utm_source: "timoweiss_me_landing_page",
  utm_medium: "portfolio_website",
  utm_campaign: "project_click",
} as const;

export function buildOutboundUrl(href: string, projectSlug: string) {
  let url: URL;

  try {
    url = new URL(href);
  } catch {
    return href;
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return href;
  }

  for (const [key, value] of Object.entries(TRACKING_PARAMETERS)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("utm_content", projectSlug);

  return url.toString();
}
