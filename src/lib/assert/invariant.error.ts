import { Fail } from '../functions';

/**
 * Error which might be thrown if invariant has been failed.
 * Contains failed invariant object.
 */
export class InvariantError extends Error {
  public readonly invariant: Fail;

  constructor(message: string, invariant: Fail) {
    super(message);

    this.invariant = invariant;

    Object.setPrototypeOf(this, InvariantError.prototype)
  }
}
