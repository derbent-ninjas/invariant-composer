import { fail, Fail, Invariant, isFail, success } from './invariant';

/**
 * Composes All invariants into one invariant,
 * if any invariant will fail,
 * result invariant will be failed.
 *
 * @param firstInvariant
 * @param restInvariants
 */
export const compose = (
  firstInvariant: Invariant,
  ...restInvariants: Invariant[]
): Invariant => {
  const allInvariants = [firstInvariant, ...restInvariants]
  const failedInvariants = allInvariants.filter(invariant => isFail(invariant)) as Fail[];

  if (failedInvariants.length === 0) {
    return success()
  } else {
    return {
      ...fail({message: ''}),
      fail: failedInvariants.map(
        invariant => invariant.fail,
      ).flat(),
    };
  }
}
