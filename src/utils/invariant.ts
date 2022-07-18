export interface InvariantFail {
  readonly data: {
    readonly failMessage: string,
    [key: string]: any;
  }
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
export const fail = (failData: InvariantFail['data']): Fail => ({
  _tag: 'Fail',
  fail: {
    data: failData,
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

