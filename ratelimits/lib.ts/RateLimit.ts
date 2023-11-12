import { RateLimitToken } from "./RateLimitToken.ts";

import type { RateLimitManager } from "./RateLimitManager.ts";

export class RateLimit<K> {
  /**
   * The {@link RateLimitManager} this Ratelimit is for.
   * @since 0.1.1 */
  private manager: RateLimitManager<K>;

  /**
   * The remaining times this {@link RateLimit} can be dripped before the RateLimit bucket is empty.
   * @since 0.1.1 */
  #remaining!: number;

  /**
   * When this {@link RateLimit} is reset back to a full state
   * @since 0.1.1 */
  #expires!: number;

  /**
   * @param manager The manager for this {@link RateLimit}.
   * @since 0.1.1 */
  public constructor(manager: RateLimitManager<K>) {
    this.manager = manager;
    this.reset();
  }

  /**
   * Whether this {@link RateLimit} is expired or not, allowing the bucket to be reset.
   * @since 0.1.1 */
  public get expired(): boolean {
    return this.remainingTime === 0;
  }

  /**
   * Whether this {@link RateLimit} is limited or not.
   * @since 0.1.1 */
  public get limited(): boolean {
    return !(this.#remaining > 0 || this.expired);
  }

  /**
   * The remaining time in milliseconds before this {@link RateLimit} instance is reset.
   * @since 0.1.1 */
  public get remainingTime(): number {
    return Math.max(this.#expires - Date.now(), 0);
  }

  /**
   * Consumes remaining limit from the {@link RateLimit} bucket.
   * @since 0.1.1 */
  public consume(): this {
    if (this.limited) throw new Error("Ratelimited");
    if (this.expired) this.reset();

    this.#remaining--;
    return this;
  }

  /**
   * Takes a token that can be returned to the bucket if something goes wrong before this resets.
   * @since 0.1.1 */
  public take(): RateLimitToken {
    this.consume();
    return new RateLimitToken(this.#expires, () => {
      this.#remaining++;
    });
  }

  /**
   * Resets the {@link RateLimit} back to it's full state.
   * @since 0.1.1 */
  public reset(): this {
    return this.resetRemaining().resetTime();
  }

  /**
   * Resets the {@link RateLimit}'s remaining uses back to full state.
   * @since 0.1.1 */
  public resetRemaining(): this {
    this.#remaining = this.manager.limit;
    return this;
  }

  /**
   * Resets the {@link RateLimit}'s reset time back to full state.
   * @since 0.1.1 */
  public resetTime(): this {
    this.#expires = Date.now() + this.manager.time;
    return this;
  }
}
