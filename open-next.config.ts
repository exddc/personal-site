import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

const baseConfig = defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});

const config: OpenNextConfig = {
  ...baseConfig,
  buildCommand: "next build",
};

export default config;

