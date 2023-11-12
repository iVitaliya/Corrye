let INCREMENT = 0n;

/**
 * A class for parsing {@link Snowflake} ids.
 * @since 0.1.1 */
export class Snowflake {
  /**
   * The id in BigInt form
   * @since 0.1.1 */
  public id: bigint;

  /**
   * The timestamp stored in the snowflake.
   * @since 0.1.1 */
  public timestamp: number;

  /**
   * The worker id stored in the snowflake
   * @since 0.1.1 */
  public workerID: number;

  /**
   * The process id stored in the snowflake
   * @since 0.1.1 */
  public processID: number;

  /**
   * The increment stored in the snowflake
   * @since 0.1.1 */
  public increment: number;

  // Discord epoch (2015-01-01T00:00:00.000Z)
  private static EPOCH = 1420070400000;

  /**
   * @param id The id to parse.
   * @since 0.1.1 */
  public constructor(id: string | bigint) {
    this.id = BigInt(id);
    this.timestamp = Number(this.id >> 22n) + Snowflake.EPOCH;
    this.workerID = Number((this.id >> 17n) & 0b11111n);
    this.processID = Number((this.id >> 12n) & 0b11111n);
    this.increment = Number(this.id & 0b111111111111n);
  }

  /**
   * The timestamp in a Date form.
   * @since 0.1.1 */
  public get date(): Date {
    return new Date(this.timestamp);
  }

  /**
   * The binary string of the snowflake.
   * @since 0.1.1 */
  public get binary(): string {
    return this.id.toString(2).padStart(64, "0");
  }

  /**
   * The snowflake as a string.
   * @since 0.1.1 */
  public toString(): string {
    return this.id.toString();
  }

  /**
   * Generates a Discord like snowflake.
   * @param timestamp Timestamp or date of the snowflake to generate.
   * @since 0.1.1 */
  public static generate(timestamp: number | Date = Date.now()): Snowflake {
    if (timestamp instanceof Date) timestamp = timestamp.getTime();

    if (typeof timestamp !== "number" || isNaN(timestamp)) {
      throw new TypeError(
        `"timestamp" argument must be a number or Date (received ${
          isNaN(timestamp) ? "NaN" : typeof timestamp
        })`,
      );
    }

    if (INCREMENT >= 4095n) INCREMENT = 0n;

    // timestamp, workerID hard-coded to 1, processID hard-coded to 1, increment
    return new Snowflake(
      (BigInt(timestamp - this.EPOCH) << 22n) | (1n << 17n) | (1n << 12n) |
        INCREMENT++,
    );
  }
}
