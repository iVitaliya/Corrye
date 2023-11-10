/**
 * Verify if the input is a function.
 * @param input The function to verify. */
// deno-lint-ignore ban-types
export function isFunction(input: unknown): input is Function {
	return typeof input === "function";
}