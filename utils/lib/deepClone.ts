// deno-lint-ignore-file no-explicit-any
import { isPrimitive } from "./isPrimitive.ts";
import { isObject } from "./isObject.ts";

/**
 * Deep clone a value.
 * @since 0.1.1
 * @param source The object to clone. */
export function deepClone<T>(source: T): T {
  // Check if it's a primitive. (with exception of function and null, which is typeof object)
  if (source === null || isPrimitive(source)) return source;
  if (Array.isArray(source)) {
    const output = [] as unknown as T & T extends (infer S)[] ? S[] : never;

    for (const value of source) output.push(deepClone(value));
    return output as unknown as T;
  }

  if (isObject(source)) {
    const output = {} as Record<PropertyKey, unknown>;

    for (const [key, value] of Object.entries(source)) {
      output[key] = deepClone(value);
    }

    return output as unknown as T;
  }

  const src = source as any;
  if (src instanceof Map) {
    const output =
      new (src.constructor as MapConstructor)() as unknown as T & T extends
        Map<infer K, infer V> ? Map<K, V> : never;

    for (const [key, value] of src.entries()) {
      output.set(key, deepClone(value));
    }
    return output as unknown as T;
  }

  if (src instanceof Set) {
    const output =
      new (src.constructor as SetConstructor)() as unknown as T & T extends
        Set<infer K> ? Set<K> : never;

    for (const value of src.values()) output.add(deepClone(value));
    return output as unknown as T;
  }

  return source;
}
