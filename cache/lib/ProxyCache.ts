import { Cache } from "./Cache.ts";

/**
 * The {@link ProxyCache proxy} {@link ProxyCache cache} structure Project-Blue uses.
 * - **K:** The type of the {@link Map} keys.
 * - **V:** The type of the {@link Map} values.
 * @since 0.1.1 */
export class ProxyCache<K, V> implements Map<K, V> {
  #keys: K[];
  #store: Map<K, V>;

  public constructor(store: Map<K, V>, keys: K[]) {
    if (store instanceof ProxyCache) {
      this.#store = store.#store;
      this.#keys = store.#keys.slice();
    } else {
      this.#store = store;
      this.#keys = typeof keys === "undefined" ? [] : keys;
    }
  }

  /**
   * Returns the number of keys in the {@link ProxyCache proxy}.
   * @since 0.1.1 */
  public get size(): number {
    return this.#keys.length;
  }

  /**
   * Returns the string tag of this proxy object. */
  public get [Symbol.toStringTag](): string {
    return "Map";
  }

  /**
   * Returns a specified element from a Map object. If the value that is associated to the provided key is an object,
   * then you will get a reference to that object and any change made to that object will effectively modify it inside
   * the Map object.
   * @param key The key of the element to return from the {@link Map} object.
   * @returns The element associated with the specified key, or `undefined` if the key can't be found in the {@link Map} object.
   * @since 0.1.1 */
  public get(key: K): V | undefined {
    return this.#keys.includes(key) ? this.#store.get(key) : undefined;
  }

  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   * @param key The key of the element to test for presence in the {@link ProxyCache proxy} and in the {@link Map} object.
   * @returns Whether or not an element with the specified key exists in the {@link ProxyCache proxy} and in the {@link Map} object.
   * @since 0.1.1 */
  public has(key: K): boolean {
    return this.#keys.includes(key) && this.#store.has(key);
  }

  /**
   * Adds a key to the {@link ProxyCache proxy} if it wasn't previously added and exists in the {@link Map} object.
   * @param key The key of the element to add to the {@link ProxyCache proxy} object.
   * @returns The modified {@link ProxyCache}.
   * @since 0.1.1 */
  public set(key: K): this {
    if (!this.#keys.includes(key) && this.#store.has(key)) this.#keys.push(key);

    return this;
  }

  /**
   * Removes a key from the {@link ProxyCache proxy}.
   * @param key The key of the element to remove from the {@link ProxyCache proxy} object.
   * @returns Whether or not the key was removed.
   * @since 0.1.1 */
  public delete(key: K): boolean {
    const index = this.#keys.indexOf(key);
    const has = index !== -1;

    if (has) this.#keys.splice(index, 1);

    return has;
  }

  /**
   * Removes all keys from the proxy.
   *  @since 0.1.1 */
  public clear(): this {
    this.#keys = [];

    return this;
  }

  /**
   * Executes a provided function once per each key/value pair in the {@link Map} object, in insertion order.
   * @param callback_func Function to execute for each element.
   * @param thisArg Value to use as this when executing callback.
   * @since 0.1.1 */
  public forEach(
    callback_func: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: unknown,
  ): void {
    const func = callback_func.bind(thisArg);
    for (const [key, value] of this.entries()) {
      func(value, key, this);
    }
  }

  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element in the {@link Map} object
   * contained in the {@link ProxyCache proxy} in insertion order.
   * @since 0.1.1 */
  public *[Symbol.iterator](): IterableIterator<[K, V]> {
    yield* this.entries();
  }

  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element in the {@link Map} object
   * contained in the {@link ProxyCache proxy} in insertion order.
   * @since 0.1.1 */
  public *entries(): IterableIterator<[K, V]> {
    for (const pair of this.#store.entries()) {
      if (this.#keys.includes(pair[0])) yield pair;
    }
  }

  /**
   * Returns a new Iterator object that contains the keys for each element in the {@link Map} object contained in the
   * {@link ProxyCache proxy} in insertion order.
   * @since 0.1.1 */
  public *keys(): IterableIterator<K> {
    for (const key of this.#store.keys()) {
      if (this.#keys.includes(key)) yield key;
    }
  }

  /**
   * Returns a new Iterator object that contains the values for each element in the {@link Map} object contained in
   * the proxy in insertion order.
   * @since 0.1.1 */
  public *values(): IterableIterator<V> {
    for (const [key, value] of this.#store.entries()) {
      if (this.#keys.includes(key)) yield value;
    }
  }

  public static get [Symbol.species](): typeof ProxyCache {
    return ProxyCache;
  }
}

export interface ProxyCache<K, V> extends Cache<K, V> {
  clone(): ProxyCache<K, V>;
}

for (const name of Object.getOwnPropertyNames(Cache.prototype)) {
  if (name === "constructor") continue;

  Object.defineProperty(
    ProxyCache.prototype,
    name,
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    Object.getOwnPropertyDescriptor(Cache.prototype, name),
  );
}
