import { toArray } from './utils/toArray';

export interface InvariantFailCustomInfo {
  readonly failMessage: string,
  readonly [key: string]: any;
}

export interface InvariantFail {
  readonly customInfo: Array<InvariantFailCustomInfo>;
  readonly path?: string;
}

export interface Success {
  readonly _tag: 'Success';
}

export interface Fail {
  readonly _tag: 'Fail';
  readonly fail: InvariantFail;
}

export type Invariant = Success | Fail;

/**
 * Creates Success Invariant;
 */
export const success = (): Success => ({
  _tag: 'Success',
} as const)

/**
 * Creates Fail Invariant;
 */
export const fail = (customInfo: InvariantFailCustomInfo | InvariantFailCustomInfo[]): Fail => ({
  _tag: 'Fail',
  fail: {
    customInfo: new Array<InvariantFailCustomInfo>(...toArray(customInfo)),
  }
} as const)

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

