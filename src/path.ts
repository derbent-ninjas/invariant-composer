import { Invariant, isFail } from './invariant';

/**
 * Takes invariant and assigns path to it.
 *
 * for example:
 * - if invariant don't have a path, and you will pass string 'examplePath', path 'examplePath' will be assigned to invariant
 * - if invariant already has a path 'examplePass', and you will pass string 'examplePass2', path 'examplePass2.examplePass' will be assigned to invariant
 *
 * @param path
 * @param invariant
 */
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
