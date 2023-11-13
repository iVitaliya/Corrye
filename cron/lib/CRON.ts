import {
  allowedNum,
  DAY,
  partRegex,
  predefined,
  tokens,
  tokensRegex,
  wildcardRegex,
} from "./utils/constants.ts";

/**
 * Handles Cron strings and generates dates based on the cron string provided.
 * @see https://en.wikipedia.org/wiki/Cron
 * @since 0.1.1 */
export class Cron {
  public cron: string;
  public normalized: string;
  public minutes: number[];
  public hours: number[];
  public days: number[];
  public months: number[];
  public dows: number[];

  /**
   * @param cron The cron pattern to use. */
  public constructor(cron: string) {
    this.cron = cron.toLowerCase();
    this.normalized = Cron._normalize(this.cron);
    [this.minutes, this.hours, this.days, this.months, this.dows] = Cron
      ._parseString(this.normalized);
  }

  // https://github.com/dirigeants/cron/blob/e68adcee3252640ce7714d53cc099b5ce0ce9d1e/src/index.ts#L27C5-L29C51
}
