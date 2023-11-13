/// <reference types="npm:@types/node" />
/**
 * Manages timers so that this application can be cleanly exited
 * @since 0.1.1 */
export class TimerManager extends null {
  /**
   * A collection of timeouts to clear on destroy
   * @since 0.1.1 */
  private static _timeouts: Set<number> = new Set();

  /**
   * A collection of intervals to clear on destroy
   * @since 0.1.1 */
  private static _intervals: Set<number> = new Set();

  /**
   * Set a timeout that Project Blue can clear when destroyed.
   * @param func callback function.
   * @param delay amount of time before running the callback.
   * @param args additional arguments to pass back to the callback.
   * @since 0.1.1 */
  public static setTimeout<A = unknown>(
    func: (...args: A[]) => void,
    delay: number,
    ...args: A[]
  ): number {
    const timeout = setTimeout(() => {
      this._timeouts.delete(timeout);
      func(...args);
    }, delay);

    this._timeouts.add(timeout);
    return timeout;
  }

  /**
   * Clears a timeout set via Project Blue.
   * @param timeout The timeout to clear.
   * @since 0.1.1 */
  public static clearTimeout(timeout: number): void {
    clearTimeout(timeout);
    this._timeouts.delete(timeout);
  }

  /**
   * Set an interval that Project Blue can clear when destroyed.
   * @param func callback function.
   * @param delay amount of time before running the callback.
   * @param args additional arguments to pass back to the callback.
   * @since 0.1.1 */
  public static setInterval<A = unknown>(
    func: (...args: A[]) => void,
    delay: number,
    ...args: A[]
  ): number {
    const interval = setInterval(func, delay, ...args);

    this._intervals.add(interval);
    return interval;
  }

  /**
   * Clears an interval set via Project Blue.
   * @param interval The interval to clear.
   * @since 0.1.1 */
  public static clearInterval(interval: number): void {
    clearInterval(interval);
    this._intervals.delete(interval);
  }

  /**
   * Clears running timeouts and intervals created in Project Blue so node can gracefully exit.
   * @since 0.1.1 */
  public static destroy(): void {
    for (const i of this._timeouts) clearTimeout(i);
    for (const i of this._intervals) clearInterval(i);

    this._timeouts.clear();
    this._intervals.clear();
  }
}
