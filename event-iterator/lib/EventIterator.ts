// deno-lint-ignore-file no-explicit-any no-var require-await
import { TimerManager } from "../../mod.ts";
import { EventEmitter } from "node:events";

function __classPrivateFieldSet(
  receiver: any,
  privateMap: WeakMap<EventIterator<any>, any>,
  value: any,
) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);

  return value;
}

var __classPrivateFieldGet = function (
  receiver: any,
  privateMap: WeakMap<EventIterator<any>, any>,
) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
};

/** An EventIterator, used for asynchronously iterating over received values. */
export class EventIterator<T> {
  emitter: EventEmitter;
  event: string | symbol;
  options: any;

  _ended = new WeakMap<this, boolean>();
  _idle = new WeakMap<this, unknown>();
  _queue = new WeakMap<this, unknown>();
  _passed = new WeakMap<this, number>();
  _limit = new WeakMap<this, unknown>();
  _idleTimer = new WeakMap();
  filter: any;

  /**
   * @param emitter The EventEmitter to listen to.
   * @param event The event we're listening for to receives values from.
   * @param limit The amount of values to receive before ending the iterator.
   * @param options Any extra options. */
  public constructor(
    emitter: EventEmitter,
    event: string | symbol,
    options: any,
  ) {
    let _a, _b;

    this.emitter = emitter;
    this.event = event;
    this.options = options;

    /**
     * Whether or not the EventIterator has ended.
     */
    this._ended.set(this, false);
    /**
     * The amount of idle time in ms before moving on.
     */
    this._idle.set(this, void 0);
    /**
     * The queue of received values.
     */
    this._queue.set(this, []);
    /**
     * The amount of events that have passed the filter.
     */
    this._passed.set(this, 0);
    /**
     * The limit before ending the EventIterator.
     */
    this._limit.set(this, void 0);
    /**
     * The timer to track when this will idle out.
     */
    this._idleTimer.set(this, null);

    __classPrivateFieldSet(
      this,
      this._limit,
      (_a = options.limit) !== null && _a !== void 0 ? _a : Infinity,
    );

    __classPrivateFieldSet(this, this._idle, options.idle);
    this.filter = (_b = options.filter) !== null && _b !== void 0
      ? _b
      : (() => true);

    // This timer is to idle out on lack of valid responses
    if (__classPrivateFieldGet(this, this._idle)) {
      __classPrivateFieldSet(
        this,
        this._idleTimer,
        TimerManager.TimerManager.setTimeout(
          this.end.bind(this),
          __classPrivateFieldGet(this, this._idle),
        ),
      );
    }

    this.push = this.push.bind(this);

    const maxListeners = this.emitter.getMaxListeners();

    if (maxListeners !== 0) {
      this.emitter.setMaxListeners(maxListeners + 1);
    }

    this.emitter.on(this.event, this.push);
  }

  /**
   * Whether or not the EventIterator has ended. */
  get ended() {
    return __classPrivateFieldGet(this, this._ended);
  }

  /**
   * Ends the EventIterator. */
  end() {
    if (__classPrivateFieldGet(this, this._ended)) {
      return;
    }
    __classPrivateFieldSet(this, this._ended, true);
    __classPrivateFieldSet(this, this._queue, []);
    this.emitter.off(this.event, this.push);
    const maxListeners = this.emitter.getMaxListeners();
    if (maxListeners !== 0) {
      this.emitter.setMaxListeners(maxListeners - 1);
    }
  }
  /**
   * The next value that's received from the EventEmitter.
   */
  async next() {
    if (__classPrivateFieldGet(this, this._queue).length) {
      const value = __classPrivateFieldGet(this, this._queue).shift();

      if (!this.filter(value)) {
        return this.next();
      }

      if (
        __classPrivateFieldSet(
          this,
          this._passed,
          +__classPrivateFieldGet(this, this._passed) + 1,
        ) >= __classPrivateFieldGet(this, this._limit)
      ) {
        this.end();
      }

      if (__classPrivateFieldGet(this, this._idleTimer)) {
        __classPrivateFieldGet(this, this._idleTimer).refresh();
      }

      return { done: false, value };
    }

    if (__classPrivateFieldGet(this, this._ended)) {
      if (__classPrivateFieldGet(this, this._idleTimer)) {
        TimerManager.TimerManager.clearTimeout(
          __classPrivateFieldGet(this, this._idleTimer),
        );
      }

      return { done: true, value: undefined };
    }

    return new Promise((resolve) => {
      let idleTimer: number;

      if (__classPrivateFieldGet(this, this._idle)) {
        // This timer is to idle out on lack of any responses
        idleTimer = TimerManager.TimerManager.setTimeout(() => {
          this.end();

          resolve(this.next());
        }, __classPrivateFieldGet(this, this._idle));
      }

      this.emitter.once(this.event, () => {
        if (idleTimer) {
          TimerManager.TimerManager.clearTimeout(idleTimer);
        }

        resolve(this.next());
      });
    });
  }
  /**
   * Handles what happens when you break or return from a loop.
   */
  async return(): Promise<{
    done: boolean;
    value: undefined;
  }> {
    this.end();

    return { done: true, value: undefined };
  }

  /**
   * Handles what happens when you encounter an error in a loop. */
  async throw(): Promise<{
    done: boolean;
    value: undefined;
  }> {
    this.end();

    return { done: true, value: undefined };
  }

  /**
   * The symbol allowing EventIterators to be used in for-await-of loops. */
  //   [
  //     (_ended = new WeakMap(),
  //       _idle = new WeakMap(),
  //       _queue = new WeakMap(),
  //       _passed = new WeakMap(),
  //       _limit = new WeakMap(),
  //       _idleTimer = new WeakMap(),
  //       Symbol.asyncIterator)
  //   ]() {
  //     return this;
  //   }

  /**
   * Pushes a value into the queue. */
  push(...value: T[]) {
    __classPrivateFieldGet(this, this._queue).push(value);
  }
}
