import { InvariantError } from './invariant.error';

export function isInvariantError(error: Error): error is InvariantError {
 return error instanceof InvariantError;
}
