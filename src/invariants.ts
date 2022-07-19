import { fail, Fail, Invariant, isFail, success } from './invariant';

export const invariants = (
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
