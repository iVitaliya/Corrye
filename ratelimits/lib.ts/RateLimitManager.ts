/// <reference types="npm:@types/node" />
import { Cache as Chc, TimerManager as TmMgr } from "../../mod.ts";
import { RateLimit } from "./RateLimit.ts";

const { Cache } = Chc;
const { TimerManager } = TmMgr;

export class RateLimitManager<K = string> extends Cache<K, RateLimit<K>> {
  /**
   * The amount of milliseconds for the {@link RateLimit ratelimit}s from this manager to expire.
   * @since 0.1.1 */
  public time: number;

  /**
   * The amount of times a {@link RateLimit} can drip before it's limited.
   * @since 0.1.1 */
  public limit: number;

  /**
   * The interval to sweep expired {@link RateLimit ratelimit}s.
   * @since 0.1.1 */
  #sweepInterval!: NodeJS.Timer | null;

  /**
   * @param time The amount of milliseconds for the {@link RateLimit ratelimit}s from this manager to expire.
   * @param limit The amount of times a RateLimit can drip before it's limited.
   * @since 0.1.1 */
  public constructor(time: number, limit = 1) {
    super();

    this.time = time;
    this.limit = limit;
  }

  /**
   * Gets a {@link RateLimit} from this manager or creates it if it does not exist.
   * @param id The id for the {@link RateLimit}.
   * @since 0.1.1 */
  public acquire(id: K): RateLimit<K> {
    return this.get(id) || this.create(id);
  }

  /**
   * Creates a {@link RateLimit} for this manager.
   * @param id The id the {@link RateLimit} belongs to
   * @since 0.1.1 */
  public create(id: K): RateLimit<K> {
    const ratelimit = new RateLimit(this);
    this.set(id, ratelimit);

    return ratelimit;
  }

  /**
   * Wraps Collection's set method to set interval to sweep inactive {@link RateLimit ratelimit}s.
   * @param id The id the {@link RateLimit} belongs to.
   * @param ratelimit The {@link RateLimit} to set.
   * @since 0.1.1 */
  public set(id: K, ratelimit: RateLimit<K>): this {
    if (!(ratelimit instanceof RateLimit)) throw new Error("Invalid RateLimit");
    if (!this.#sweepInterval) {
      this.#sweepInterval = TimerManager.setInterval(
        this.sweep.bind(this),
        30000,
      );
    }

    return super.set(id, ratelimit);
  }

  /**
   * Wraps Collection's sweep method to clear the interval when this manager is empty.
   * @param func The filter function.
   * @param thisArg The this for the sweep.
   * @since 0.1.1 */
  public sweep(
    func: (value: RateLimit<K>, key: K, collection: this) => boolean = (
      rl,
    ): boolean => rl.expired,
    // deno-lint-ignore no-explicit-any
    thisArg?: any,
  ): number {
    const amount = super.sweep(func, thisArg);

    if (this.size === 0) {
      TimerManager.clearInterval(
        this.#sweepInterval as NodeJS.Timer,
      );
      this.#sweepInterval = null;
    }

    return amount;
  }

  public static get [Symbol.species](): typeof Cache {
    return Cache;
  }
}
