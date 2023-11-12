import { Cache, TimerManager } from "../../mod.ts";
import { RateLimit } from "./RateLimit";

export class RateLimitManager<K = string> extends Cache.Cache<K, RateLimit<K>> {
  /**
   * The amount of milliseconds for the ratelimits from this manager to expire.
   * @since 0.1.1 */
  public time: number;

  /**
   * The amount of times a RateLimit can drip before it's limited.
   * @since 0.1.1 */
  public limit: number;

  /**
   * The interval to sweep expired ratelimits.
   * @since 0.1.1 */
  #sweepInterval!: typeof window.clearTimeout | null;
} // https://github.com/dirigeants/ratelimits/blob/6049945a6209e5ec99381fb424f5f88cf57ea973/src/RateLimitManager.ts#L20C39-L20C39
