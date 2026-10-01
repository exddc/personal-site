import { describe, expect, test } from "bun:test";

import { buildOutboundUrl } from "./utils";

describe("buildOutboundUrl", () => {
  test("adds portfolio tracking while preserving existing parameters", () => {
    const result = new URL(
      buildOutboundUrl("https://example.com/project?ref=home", "openchime"),
    );

    expect(result.searchParams.get("ref")).toBe("home");
    expect(result.searchParams.get("utm_source")).toBe(
      "timoweiss_me_landing_page",
    );
    expect(result.searchParams.get("utm_medium")).toBe("portfolio_website");
    expect(result.searchParams.get("utm_campaign")).toBe("project_click");
    expect(result.searchParams.get("utm_content")).toBe("openchime");
  });

  test.each(["relative/path", "mailto:hello@example.com"])(
    "leaves unsupported URL %s unchanged",
    (href) => {
      expect(buildOutboundUrl(href, "project")).toBe(href);
    },
  );
});
