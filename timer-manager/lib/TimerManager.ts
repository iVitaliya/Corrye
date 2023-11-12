/**
 * Manages timers so that this application can be cleanly exited
 * @since 0.1.1 */
export class TimerManager extends null {
  /**
   * A collection of timeouts to clear on destroy
   * @since 0.1.1 */
  private static _timeouts: Set<NodeJS.Timeout> = new Set();

  /**
   * A collection of intervals to clear on destroy
   * @since 0.1.1 */
  private static _intervals: Set<NodeJS.Timeout> = new Set();

  /**
   * Set a timeout that Project Blue can clear when destroyed
   * @param func callback function
   * @param delay amount of time before running the callback
   * @param args additional arguments to pass back to the callback
   */
  public static setTimeout<A = unknown>(
    func: (...args: A[]) => void,
    delay: number,
    ...args: A[]
  ): NodeJS.Timeout {
    const timeout = setTimeout(() => {
      this._timeouts.delete(timeout);
      func(...args);
    }, delay);

    this._timeouts.add(timeout);
    return timeout;
  }

  /**
   * Clears a timeout set via Project Blue
   * @param timeout The timeout to clear
   */
  public static clearTimeout(timeout: NodeJS.Timeout): void {
    clearTimeout(timeout);
    this._timeouts.delete(timeout);
  }

  /**
   * Set an interval that Project Blue can clear when destroyed
   * @param fn callback function
   * @param delay amount of time before running the callback
   * @param args additional arguments to pass back to the callback
   */
  public static setInterval<A = unknown>(
    fn: (...args: A[]) => void,
    delay: number,
    ...args: A[]
  ): NodeJS.Timeout {
    const interval = setInterval(fn, delay, ...args);
    this._intervals.add(interval);
    return interval;
  }

  /**
   * Clears an interval set via Project Blue
   * @param interval The interval to clear
   */
  public static clearInterval(interval: NodeJS.Timeout): void {
    clearInterval(interval);
    this._intervals.delete(interval);
  }

  /**
   * Clears running timeouts and intervals created in Project Blue so node can gracefully exit
   */
  public static destroy(): void {
    for (const i of this._timeouts) clearTimeout(i);
    for (const i of this._intervals) clearInterval(i);
    this._timeouts.clear();
    this._intervals.clear();
  }
}
