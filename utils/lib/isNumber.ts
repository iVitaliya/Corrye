/**
 * Verify if a number is a finite number.
 * @since 0.1.1
 * @param input The number to verify. */
export function isNumber(input: unknown): input is number {
  return typeof input === "number" && !isNaN(input) && Number.isFinite(input);
}
