const PRIMITIVE_TYPES = ["string", "boolean", "number", "bigint"];

/**
 * Check whether a value is a primitive.
 * @since 0.1.1
 * @param input The input to check. */
export function isPrimitive(
  input: unknown,
): input is string | boolean | number | bigint {
  return PRIMITIVE_TYPES.includes(typeof input);
}
