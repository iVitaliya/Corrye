export interface BitFieldObject {
  bitfield: number;
}

export type BitFieldResolvable =
  | string
  | number
  | BitFieldObject
  | (string | number | BitFieldObject)[];

/**
 * The base class for handling BitField data
 * @since 0.1.1 */
export class BitField<T extends BitFieldResolvable> implements BitFieldObject {
  /**
   * The bitfield data.
   * @since 0.1.1 */
  public bitfield: number;

  public constructor(bits?: T) {
    this.bitfield = (this.constructor as typeof BitField).resolve<T>(bits);
  }

  /**
   * Checks if this {@link BitField} matches another {@link BitField} resolvable.
   * @param bit The bit/s to check.
   * @since 0.1.1 */
  public equals(bit: T): boolean {
    return this.bitfield === (this.constructor as typeof BitField).resolve(bit);
  }

  /**
   * Checks if this {@link BitField} has a bit or bits.
   * @param bit The bit/s
   * @since 0.1.1  */
  public has(bit: T): boolean {
    const bits = (this.constructor as typeof BitField).resolve<T>(bit);

    return (this.bitfield & bits) === bits;
  }

  /**
   * Returns any bits this {@link BitField} is missing.
   * @param bits The bit/s to check for.
   * @since 0.1.1 */
  public missing(bits: T): string[] {
    return new (this.constructor as typeof BitField)(bits).remove(
      this.bitfield as T,
    ).toArray();
  }

  /**
   * Freezes this {@link BitField}.
   * @since 0.1.1 */
  public freeze(): this {
    return Object.freeze(this);
  }

  /**
   * Adds a bit to this {@link BitField} or a new {@link BitField} if this is frozen.
   * @param bits The bit/s to add.
   * @since 0.1.1 */
  public add(...bits: T[]): BitField<T> {
    const total = bits.reduce(
      (acc, bit) => acc | (this.constructor as typeof BitField).resolve<T>(bit),
      0,
    );

    if (Object.isFrozen(this)) {
      return new (this.constructor as typeof BitField)<T>(
        (this.bitfield | total) as T,
      );
    }

    this.bitfield |= total;
    return this;
  }

  /**
   * Removes a bit to this {@link BitField} or a new {@link BitField} if this is frozen.
   * @param bits The bit/s to remove.
   * @since 0.1.1 */
  public remove(...bits: T[]): BitField<T> {
    const total = bits.reduce(
      (acc, bit) => acc | (this.constructor as typeof BitField).resolve<T>(bit),
      0,
    );

    if (Object.isFrozen(this)) {
      return new (this.constructor as typeof BitField)<T>(
        (this.bitfield & ~total) as T,
      );
    }

    this.bitfield &= ~total;
    return this;
  }

  /**
   * Returns only the bits in common between this {@link BitField bitfield} and the passed bits.
   * @param bits The bit/s to mask.
   * @since 0.1.1 */
  public mask(...bits: T[]): BitField<T> {
    const total = bits.reduce(
      (acc, bit) => acc | (this.constructor as typeof BitField).resolve<T>(bit),
      0,
    );

    if (Object.isFrozen(this)) {
      return new (this.constructor as typeof BitField)<T>(
        (this.bitfield & total) as T,
      );
    }

    this.bitfield &= total;
    return this;
  }

  /**
   * Returns an object of flags: boolean.
   * @since 0.1.1 */
  public serialize(): Record<string, boolean> {
    const serialized: Record<string, boolean> = {};

    for (
      const bit of Object.keys((this.constructor as typeof BitField).FLAGS)
    ) serialized[bit] = this.has(bit as T);

    return serialized;
  }

  /**
   * Returns an array of Flags that make up this {@link BitField}.
   * @since 0.1.1 */
  public toArray(): string[] {
    return Object.keys((this.constructor as typeof BitField).FLAGS).filter((
      bit,
    ) => this.has(bit as T));
  }

  /**
   * Defines what this {@link BitField} is when converted to JSON.
   * @since 0.1.1 */
  public toJSON(): number {
    return this.bitfield;
  }

  /**
   * Defines value behavior of this {@link BitField}.
   * @since 0.1.1 */
  public valueOf(): number {
    return this.bitfield;
  }

  /**
   * Defines iterable behavior for {@link BitField}s.
   * @since 0.1.1 */
  public *[Symbol.iterator](): IterableIterator<string> {
    yield* this.toArray();
  }

  /**
   * Flags for this {@link BitField}. (Should be implemented in child classes)
   * @since 0.1.1 */
  public static FLAGS: Record<string, number> = {} as const;

  /**
   * The default flags for the {@link BitField bitfield}.
   * @since 0.1.1 */
  public static DEFAULT = 0;

  /**
   * The value of all bits in this {@link BitField bitfield}.
   * @since 0.1.1 */
  public static get ALL(): number {
    return Object.values<number>(this.FLAGS).reduce(
      (all, byte) => all | byte,
      0,
    );
  }

  /**
   * Resolves a BitFieldResolvable into a number.
   * @param bit The bit/s to resolve.
   * @since 0.1.1 */
  public static resolve<T extends BitFieldResolvable>(bit?: T): number {
    if (typeof bit === "undefined") return 0;
    if (typeof bit === "number" && bit >= 0) return bit;
    if (bit instanceof BitField) return bit.bitfield;
    if (Array.isArray(bit)) {
      return (bit as (string | number | BitFieldObject)[]).map((byte) =>
        this.resolve(byte)
      ).reduce((bytes, byte) => bytes | byte, 0);
    }
    if (typeof bit === "string") return this.FLAGS[bit];

    throw new RangeError(
      `An invalid bit was provided. Received: ${typeof bit}`,
    );
  }
}
