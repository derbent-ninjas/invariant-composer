import { Invariant, isFail, Success, path as setPath } from '../functions';
import { InvariantError } from './invariant.error';
import { INVARIANT_HAS_FAILED } from './constants';

/**
 * - throws `InvariantError` if invariant is failed.
 * - sets path
 *
 * @param path
 * @param invariant
 */
export function assert(path: string, invariant: Invariant): asserts invariant is Success {
  if (isFail(invariant)) {
    throw new InvariantError(INVARIANT_HAS_FAILED, setPath(path, invariant));
  }
}
