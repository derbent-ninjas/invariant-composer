import { toArray } from './utils/toArray';

/**
 * You must pass error message.
 *
 * You also can pass any other additional information if you need to.
 */
export interface InvariantFailCustomInfo {
  readonly message: string,
  readonly [key: string]: any;
}

export type InvariantFails = {
  readonly customInfo: InvariantFailCustomInfo;
  path?: string;
}[]

/**
 * Success Invariant
 */
export interface Success {
  readonly _tag: 'Success';
}

/**
 * Fail Invariant
 */
export interface Fail {
  readonly _tag: 'Fail';
  readonly fail: InvariantFails;
}

export type Invariant = Success | Fail;

/**
 * Creates Success Invariant;
 */
export const success = (): Success => ({
  _tag: 'Success',
});

/**
 * Creates Fail Invariant;
 */
export const fail = (customInfo: InvariantFailCustomInfo | InvariantFailCustomInfo[]): Fail => ({
  _tag: 'Fail',
  fail: toArray(customInfo).map(info => ({
    customInfo: info,
  })),
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
