/**
 * Verify if the input is an object literal. (or class)
 * @since 0.1.1
 * @param input The object to verify. */
export function isObject(
  input: unknown,
): input is Record<PropertyKey, unknown> | object {
  return typeof input === "object" && input
    ? input.constructor === Object
    : false;
}
