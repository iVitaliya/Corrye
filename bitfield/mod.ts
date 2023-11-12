export interface BitFieldObject {
  bitfield: number;
}

export type BitFieldResolvable =
  | string
  | number
  | BitFieldObject
  | (string | number | BitFieldObject)[];

/**
 * The base class for handling BitField data
 * @since 0.1.1 */
// https://github.com/dirigeants/bitfield/blob/43349a56d32e10559240f07117fc3eea2bc6435c/src/index.ts#L12
