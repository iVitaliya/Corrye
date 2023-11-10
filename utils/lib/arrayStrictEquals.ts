/**
 * Compare if both arrays are strictly equal.
 * @since 0.1.1
 * @param first_array The first array to compare.
 * @param second_array The second array to compare. */
export function arrayStrictlyEquals<T extends readonly unknown[]>(first_array: T, second_array: T): boolean {
	if (first_array === second_array) return true;
    if (first_array.length !== second_array.length) return false;

    for (let i = 0; i < first_array.length; i++) {
        if (first_array[i] !== second_array[i]) return false;
    }

    return true;
}
