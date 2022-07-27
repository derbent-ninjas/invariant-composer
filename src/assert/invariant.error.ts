import { Fail } from '../functions';

export class InvariantError extends Error {
  public readonly invariant: Fail;

  constructor(message: string, invariant: Fail) {
    super(message);

    this.invariant = invariant;

    Object.setPrototypeOf(this, InvariantError.prototype)
  }
}
