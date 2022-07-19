import { toArray } from './utils/toArray';

export interface InvariantFailCustomInfo {
  readonly message: string,
  readonly [key: string]: any;
}

export type InvariantFails = {
  readonly customInfo: InvariantFailCustomInfo;
  path?: string;
}[]

export interface Success {
  readonly _tag: 'Success';
  readonly path: (path: string) => Success,
}

export interface Fail {
  readonly _tag: 'Fail';
  readonly fail: InvariantFails;
  readonly path: (path: string) => Fail,
}

export type Invariant = Success | Fail;

/**
 * Creates Success Invariant;
 */
export const success = (): Success => ({
  _tag: 'Success',
  path(path: string) {
    return this
  }
});

/**
 * Creates Fail Invariant;
 */
export const fail = (customInfo: InvariantFailCustomInfo | InvariantFailCustomInfo[]): Fail => ({
  _tag: 'Fail',
  fail: toArray(customInfo).map(info => ({
    customInfo: info,
  })),
  path(path: string): Fail {
    this.fail.forEach(fail => {
      if (!fail.path) {
        fail.path = path;
      } else {
        fail.path = `${path}.${fail.path}`;
      }
    })
    return this
  }
})

/**
 * If invariant is Success:
 * - returns true
 * - asserts invariant type as Success
 * @param invariant
 */
export const isSuccess = (invariant: Invariant): invariant is Success =>
  invariant._tag === 'Success';

/**
 * If invariant is Fail:
 * - returns true
 * - asserts invariant type as Fail
 * @param invariant
 */
export const isFail = (invariant: Invariant): invariant is Fail =>
  invariant._tag === 'Fail';
