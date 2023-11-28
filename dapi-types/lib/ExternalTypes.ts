/** This type is used to make all properties defined in `T` optional, except those defined in `P` */
export type Optional<T, P extends keyof T> = {
	[Property in keyof T]?: T[Property];
} & { [Property in P]-?: T[P]; };

export type OptionalOnly<T> = {
	[Property in keyof T]?: T[Property];
};