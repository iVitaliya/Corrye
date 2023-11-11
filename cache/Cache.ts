/**
 * The cache structure Project-Blue uses.
 * @template K The type of the {@link Map} keys.
 * @template V The type of the {@link Map} values. */
export class Cache<K, V> extends Map<K, V> {
  /**
   * The first item in this {@link Cache}.
   * @since 0.1.1 */
  public get first(): [K, V] | null {
    return this.size ? this.entries().next().value : null;
  }

  // https://github.com/dirigeants/cache/blob/72362f139e141905956a25298cc7fe41aa215e48/src/Cache.ts#L15
}
