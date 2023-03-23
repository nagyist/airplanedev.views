import { Fetcher as LibFetcher } from "@airplane/lib";

import {
  AIRPLANE_API_HOST,
  AIRPLANE_TOKEN,
  AIRPLANE_API_KEY,
  AIRPLANE_ENV_SLUG,
  AIRPLANE_TUNNEL_TOKEN,
  AIRPLANE_SANDBOX_TOKEN,
  AIRPLANE_API_HEADERS,
} from "client/env";
import { getNPMPackageVersion } from "getNPMPackageVersion";

// Fetcher wraps `@airplane/lib` Fetcher to allow us to lazily construct a Fetcher
// instance with proper defaults. We must do this lazily since various build steps
// rely on calling `setEnvVars`.
export class Fetcher extends LibFetcher {
  constructor() {
    let headers = undefined;
    try {
      headers = JSON.parse(AIRPLANE_API_HEADERS);
    } catch (e) {
      // If we encounter a JSON parse error, ignore the value.
    }
    super({
      host: AIRPLANE_API_HOST,
      token: AIRPLANE_TOKEN,
      apiKey: AIRPLANE_API_KEY,
      tunnelToken: AIRPLANE_TUNNEL_TOKEN,
      sandboxToken: AIRPLANE_SANDBOX_TOKEN,
      envSlug: AIRPLANE_ENV_SLUG,
      headers,
      clientKind: "views",
      clientVersion: getNPMPackageVersion(),
    });
  }
}
