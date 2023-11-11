// deno-lint-ignore-file ban-types
import { isFunction } from "./isFunction.ts";

export interface Thenable {
  then: Function;
  catch: Function;
}

function hasThen(input: { then?: Function }): boolean {
  return Reflect.has(input, "then") && isFunction(input.then);
}

function hasCatch(input: { catch?: Function }): boolean {
  return Reflect.has(input, "catch") && isFunction(input.catch);
}

/**
 * Verify if an object is a promise.
 * @since 0.1.1
 * @param input The promise to verify. */
export function isThenable(input: unknown): input is Thenable {
  if (typeof input !== "object" || input === null) return false;

  return (input instanceof Promise) ||
    (input !== Promise.prototype && hasThen(input) && hasCatch(input));
}
