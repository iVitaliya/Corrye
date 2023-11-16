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

	/**
		* Get the next date that matches with the current pattern.
		* */
	public next(outset: Date = new Date(), origin = true): Date {
	if (!this.days.includes(outset.getUTCDate()) || !this.months.includes(outset.getUTCMonth() + 1) || !this.dows.includes(outset.getUTCDay())) {
		return this.next(new Date(outset.getTime() + DAY), false);
	}

	if (!origin) return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), this.hours[0], this.minutes[0]));

	const now = new Date(outset.getTime() + 60000);

	for (const hour of this.hours) {
		if (hour < now.getUTCHours()) continue;

		for (const minute of this.minutes) {
			if (hour === now.getUTCHours() && minute < now.getUTCMinutes()) continue;
			return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), hour, minute));
		}
		}
	}
}
