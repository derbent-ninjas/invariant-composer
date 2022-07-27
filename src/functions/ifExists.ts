import { Invariant, success } from './invariant';

/**
 * Executes invariant function only if passed property is not `undefined`.
 *
 * @param property
 * @param fnInvariant
 */
export const ifExists = <T>(
  property: T | undefined,
  fnInvariant: (field: T) => Invariant
): Invariant =>
  (property === undefined ? success() : fnInvariant(property))
