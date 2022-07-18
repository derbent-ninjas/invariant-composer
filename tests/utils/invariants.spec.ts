import { Fail, fail, Invariant } from '../../src/invariant'
import { invariants } from '../../src/invariants';
import { NonEmptyArray } from '../../src/nonEmptyArray';
import { Success, success } from '../../dist/invariant';

describe('invariants', () => {
  const testCases = [
    {
      toString: () => '3 failed invariants - should return invariant with 3 elements in customInfo Array',
      passedInvariants: [
        fail({ failMessage: 'fail 1' }),
        fail({ failMessage: 'fail 2' }),
        fail({ failMessage: 'fail 3' }),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        _tag: 'Fail',
        fail: {
          customInfo: [
            { failMessage: 'fail 1' },
            { failMessage: 'fail 2' },
            { failMessage: 'fail 3' },
          ]
        }
      } as Fail,
    },
    {
      toString: () => '3 failed invariants, 4 succeeded - should return invariant with 3 elements in customInfo Array',
      passedInvariants: [
        success(),
        fail({ failMessage: 'fail 1' }),
        success(),
        fail({ failMessage: 'fail 2' }),
        success(),
        fail({ failMessage: 'fail 3' }),
        success(),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        _tag: 'Fail',
        fail: {
          customInfo: [
            { failMessage: 'fail 1' },
            { failMessage: 'fail 2' },
            { failMessage: 'fail 3' },
          ]
        }
      } as Fail,
    },
    {
      toString: () => '2 fails with 5 fail messages - should one invariant with 4 fail messages',
      passedInvariants: [
        fail([{ failMessage: 'fail 1' }, { failMessage: 'fail 2' }, { failMessage: 'fail 3' }]),
        fail([{ failMessage: 'fail 4' }, { failMessage: 'fail 5' }]),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        _tag: 'Fail',
        fail: {
          customInfo: [
            { failMessage: 'fail 1' },
            { failMessage: 'fail 2' },
            { failMessage: 'fail 3' },
            { failMessage: 'fail 4' },
            { failMessage: 'fail 5' },
          ]
        }
      } as Fail,
    },
    // Success
    {
      toString: () => '1 success - should return Success invariant',
      passedInvariants: [
        success(),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        _tag: 'Success',
      } as Success,
    },
  ]

  test.each(testCases)('%s', ({ passedInvariants, expectedInvariant }) => {
    expect(invariants(...passedInvariants)).toStrictEqual(expectedInvariant)
  })
});
