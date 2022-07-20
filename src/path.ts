import { Invariant, isFail } from './invariant';

export const path = <T extends Invariant>(path: string, invariant: T): T => {
  if (isFail(invariant)) {
    invariant.fail.forEach(fail => {
      if (!fail.path) {
        fail.path = path;
      } else {
        fail.path = `${path}.${fail.path}`;
      }

      return
    })
  }

  return invariant;
}
