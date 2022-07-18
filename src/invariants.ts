import { Invariant, isFail, success, fail, Fail } from './invariant';

export const invariants = (
  firstInvariant: Invariant,
  ...restInvariants: Invariant[]
): Invariant => {
  const allInvariants = [firstInvariant, ...restInvariants]
  const failedInvariants = allInvariants.filter(invariant => isFail(invariant)) as Fail[];

  if (failedInvariants.length > 0) {
    const allFailedInfo = failedInvariants.map(invariant => invariant.fail.map(fail => fail.customInfo))
    return fail(allFailedInfo.flat())
  } else {
    return success()
  }
}
