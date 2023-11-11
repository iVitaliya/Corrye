import { deepClone } from "./deepClone.ts";
import { isObject } from "./isObject.ts";

import type { DeepRequired } from "./utilityTypes.ts";

// deno-lint-ignore ban-types
type NonNullObject = {};

/**
 * Sets default properties on an object that aren't already specified.
 * @since 0.1.1
 * @param defaults Default properties.
 * @param given Object to assign defaults to. */
export function mergeDefault<D extends NonNullObject, G extends Partial<D>>(
  defaults: D,
  given?: G,
): DeepRequired<D & G> {
  if (!given) return deepClone(defaults) as DeepRequired<D & G>;
  for (const [key, value] of Object.entries(defaults)) {
    const givenValue = Reflect.get(given, key);
    if (typeof givenValue === "undefined") {
      Reflect.set(given, key, deepClone(value));
    } else if (isObject(givenValue)) {
      Reflect.set(given, key, mergeDefault(value as NonNullObject, givenValue));
    }
  }

  return given as DeepRequired<D & G>;
}
