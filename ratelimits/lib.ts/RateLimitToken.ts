/**
 * Class that handles ratelimits for long running actions that may error.
 * @since 0.1.1 */
export class RateLimitToken {
  /**
   * When this token expires.
   * @since 0.1.1 */
  #expires: number;

  /**
   * The reject handler that restores the remaining to the RateLimit this is for.
   * @since 0.1.1 */
  #revert: () => void;

  /**
   * If this token has been used.
   * @since 0.1.1 */
  #used = false;

  /**
   * @param expires When this token expires.
   * @param revert The reject handler that restores the remaining to the RateLimit this is for.
   * @since 0.1.1 */
  public constructor(expires: number, revert: () => void) {
    this.#expires = expires;
    this.#revert = revert;
  }

  /**
   * Marks this token as used. (for use when the underlying task completes successfully)
   * @since 0.1.1 */
  public commit(): void {
    if (this.#used) throw new Error("Token has already been used.");

    this.#used = true;
  }

  /**
   * Marks this token as used and returns the token to the ratelimit. (for use when the underlying task fails)
   * @since 0.1.1 */
  public revert(): void {
    this.commit();

    if (Date.now() < this.#expires) this.#revert();
  }
}
