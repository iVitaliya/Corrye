// deno-lint-ignore-file no-explicit-any
/**
 * The {@link Cache cache} structure Project-Blue uses.
 * - **K:** The type of the {@link Map} keys.
 * - **V:** The type of the {@link Map} values.
 * @since 0.1.1 */
export class Cache<K, V> extends Map<K, V> {
  /**
   * The first item in this {@link Cache}.
   * @since 0.1.1 */
  public get first(): [K, V] | null {
    return this.size ? this.entries().next().value : null;
  }

  /**
   * The first key of this {@link Cache cache}.
   * @since 0.1.1 */
  public get firstKey(): K | null {
    return this.size ? this.keys().next().value : null;
  }

  /**
   * The first value of this {@link Cache cache}.
   * @since 0.1.1 */
  public get firstValue(): V | null {
    return this.size ? this.values().next().value : null;
  }

  /**
   * The last item in this {@link Cache cache}.
   * @since 0.1.1 */
  public get last(): [K, V] | null {
    return this.size ? [...this.entries()][this.size - 1] : null;
  }

  /**
   * The last key in this {@link Cache cache}.
   * @since 0.1.1 */
  public get lastKey(): K | null {
    return this.size ? [...this.keys()][this.size - 1] : null;
  }

  /**
   * The last value in this {@link Cache cache}.
   * @since 0.1.1 */
  public get lastValue(): V | null {
    return this.size ? [...this.values()][this.size - 1] : null;
  }

  /**
   * Finds an entry from this {@link Cache cache}.
   * @param func Function used to find what you are looking for.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public find(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): [K, V] | undefined {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    for (const [key, value] of this) {
      if (func(value, key, this)) return [key, value];
    }

    return undefined;
  }

  /**
   * Finds a key from this {@link Cache cache}.
   * @param func Function used to find what you are looking for.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public findKey(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): K | undefined {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    for (const [key, value] of this) if (func(value, key, this)) return key;

    return undefined;
  }

  /**
   * Finds a value from this {@link Cache cache}.
   * @param func Function used to find what you are looking for.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public findValue(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): V | undefined {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    for (const [key, value] of this) if (func(value, key, this)) return value;

    return undefined;
  }

  /**
   * Sweeps entries from this {@link Cache cache}.
   * @param func Function used to determine what entries are swept.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public sweep(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): number {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    const previousSize = this.size;
    for (const [key, val] of this) if (func(val, key, this)) this.delete(key);

    return previousSize - this.size;
  }

  /**
   * Returns a new filtered {@link Cache cache} based on the filter function.
   * @param func Function used to determine what entries are in the new {@link Cache cache}.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public filter(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): Cache<K, V> {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    const results =
      new (this.constructor as typeof Cache)[Symbol.species]() as Cache<K, V>;
    for (const [key, value] of this) {
      if (func(value, key, this)) results.set(key, value);
    }

    return results;
  }

  /**
   * Maps this {@link Cache cache} to an array (like Array#map())
   * @param func Function to determine what is mapped to the new Array.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public map<T = any>(
    func: (value: V, key: K, map: this) => T,
    thisArg?: any,
  ): T[] {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    const arr = [];
    let i = 0;
    for (const [key, value] of this) arr[i++] = func(value, key, this);

    return arr;
  }

  /**
   * Tests if some entries in this {@link Cache cache} meets a condition.
   * @param func The function to test the condition.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public some(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): boolean {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    for (const [key, value] of this) if (func(value, key, this)) return true;

    return false;
  }

  /**
   * Tests if every entry in this {@link Cache cache} meets a condition.
   * @param func The function to test the condition.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public every(
    func: (value: V, key: K, map: this) => boolean,
    thisArg?: any,
  ): boolean {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    for (const [key, value] of this) if (!func(value, key, this)) return false;

    return true;
  }

  /**
   * Reduces this {@link Cache cache} into a singularity.
   * @param func The function to determine how this {@link Cache cache} is reduced.
   * @param initialValue The initial value.
   * @param thisArg Optional binding for the `func` param.
   * @since 0.1.1 */
  public reduce<I>(
    func: (accumulator: I, value: V, key: K, map: this) => I,
    initialValue: I,
    thisArg?: any,
  ): I {
    if (typeof thisArg !== "undefined") func = func.bind(thisArg);

    let accumulator = initialValue;
    for (const [key, value] of this) {
      accumulator = func(accumulator, value, key, this);
    }

    return accumulator;
  }

  /**
   * Returns a shallow clone of this {@link Cache cache}.
   * @since 0.1.1 */
  public clone(): Cache<K, V> {
    return new (this.constructor as typeof Cache)[Symbol.species](
      this,
    ) as Cache<K, V>;
  }

  /**
   * Returns a new {@link Cache cache} with this and other {@link Cache cache}s together.
   * @param caches Other caches to include in the new {@link Cache cache}.
   * @since 0.1.1 */
  public concat(...caches: Cache<K, V>[]): Cache<K, V> {
    const newCollection = this.clone();
    for (const collection of caches) {
      for (const [key, value] of collection) newCollection.set(key, value);
    }

    return newCollection;
  }

  /**
   * Naive equality compare function.
   * @param cache The {@link Cache cache} to compare this against.
   * @since 0.1.1 */
  public equals(cache: Cache<K, V>): boolean {
    return this === cache ||
      (this.size === cache.size &&
        this.every((value, key) => cache.get(key) === value));
  }

  /**
   * Sorts entries in-place in this {@link Cache cache}.
   * @param compareFunction Function to determine how this Cache should be sorted.
   * @since 0.1.1 */
  public sort(
    compareFunction: (value_1: V, value_2: V, key_1?: K, key_2?: K) => number =
      (
        first,
        second,
      ): number => +(first > second) || +(first === second) - 1,
  ): this {
    const entries = [...this.entries()]
      .sort((entry_1, entry_2) =>
        compareFunction(entry_1[1], entry_2[1], entry_1[0], entry_2[0])
      );

    this.clear();

    for (const [key, value] of entries) this.set(key, value);

    return this;
  }

  /**
   * Sorts entries in a new Cache
   * @param compareFunction Function to determine how the resulting Cache should be sorted.
   * @since 0.1.1 */
  public sorted(
    compareFunction: (value_1: V, value_2: V, key_1?: K, key_2?: K) => number =
      (
        first,
        second,
      ): number => +(first > second) || +(first === second) - 1,
  ): Cache<K, V> {
    const entries = [...this.entries()]
      .sort((entry_1, entry_2) =>
        compareFunction(entry_1[1], entry_2[1], entry_1[0], entry_2[0])
      );

    return new (this.constructor as typeof Cache)(entries);
  }
}
