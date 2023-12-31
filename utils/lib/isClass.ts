/**
 * Verify if the input is a class constructor.
 * @since 0.1.1
 * @param input The function to verify. */
export function isClass(input: unknown): boolean {
  return typeof input === "function" &&
    typeof input.prototype === "object" &&
    input.toString().substring(0, 5) === "class";
}
