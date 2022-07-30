import { InvariantError } from './invariant.error';

/**
 * Predicate, which returns true, if passed value is `InvariantError`.
 * @param error
 */
export function isInvariantError(error: any): error is InvariantError {
 return error instanceof InvariantError;
}
