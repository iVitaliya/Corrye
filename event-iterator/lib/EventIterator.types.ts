import type { EventEmitter } from "node:events";

/** A filter for an EventIterator. */
export declare type EventIteratorFilter<V> = (value: V) => boolean;

/** Options to be passed to an EventIterator. */
export interface EventIteratorOptions<V> {
  /** The filter. */
  filter?: EventIteratorFilter<V>;
  /** The timeout in ms before ending the EventIterator. */
  idle?: number;
  /** The limit of events that pass the filter to iterate. */
  limit?: number;
}

/** An EventIterator, used for asynchronously iterating over received values. */
export declare class EventIterator<V extends unknown[]>
  implements AsyncIterableIterator<V> {
  #private;
  readonly emitter: EventEmitter;
  event: string;

  /** The filter used to filter out values. */
  filter: EventIteratorFilter<V>;

  /**
   * @param emitter The EventEmitter to listen to.
   * @param event The event we're listening for to receives values from.
   * @param options Any extra options. */
  constructor(
    emitter: EventEmitter,
    event: string,
    options?: EventIteratorOptions<V>,
  );

  /** Whether or not the EventIterator has ended. */
  get ended(): boolean;

  /** Ends the EventIterator. */
  end(): void;

  /** The next value that's received from the EventEmitter. */
  next(): Promise<IteratorResult<V>>;

  /** Handles what happens when you break or return from a loop. */
  return(): Promise<IteratorResult<V>>;

  /** Handles what happens when you encounter an error in a loop. */
  throw(): Promise<IteratorResult<V>>;

  /** The symbol allowing EventIterators to be used in for-await-of loops. */
  [Symbol.asyncIterator](): AsyncIterableIterator<V>;

  /** Pushes a value into the queue. */
  protected push(...value: V): void;
}
