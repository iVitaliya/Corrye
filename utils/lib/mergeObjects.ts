import { isObject } from "./isObject.ts";

/**
 * Merges two objects.
 * @since 0.1.1
 * @param targed The object to be merged.
 * @param source The object to merge. */
export function mergeObjects<T extends object, S extends object>(
  targed: T,
  source: S,
): T & S {
  for (const [key, value] of Object.entries(source)) {
    const targetValue = Reflect.get(targed, key);

    if (isObject(value)) {
      Reflect.set(
        targed,
        key,
        isObject(targetValue)
          ? mergeObjects(targetValue, value as object)
          : value,
      );
    } else if (!isObject(targetValue)) {
      Reflect.set(targed, key, value);
    }
  }

  return targed as T & S;
}
