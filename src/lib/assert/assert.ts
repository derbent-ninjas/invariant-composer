import { Invariant, isFail, Success, path as setPath } from '../functions';
import { InvariantError } from './invariant.error';
import { INVARIANT_HAS_FAILED } from './constants';

export function assert(path: string, invariant: Invariant): asserts invariant is Success {
  if (isFail(invariant)) {
    throw new InvariantError(INVARIANT_HAS_FAILED, setPath(path, invariant));
  }
}
