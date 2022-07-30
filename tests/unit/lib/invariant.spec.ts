import { fail, InvariantFailCustomInfo, isFail, isSuccess, success } from '../../../src';

describe('Invariant', () => {
  const predicatesTestCases = [
    {
      toString: () => 'isSuccess for Success - should return true',
      predicate: isSuccess,
      invariant: success(),
      expectedPredicateResult: true,
    },
    {
      toString: () => 'isFail for Fail - should return true',
      predicate: isFail,
      invariant: fail({ message: 'some message' }),
      expectedPredicateResult: true,
    },
    {
      toString: () => 'isSuccess for Fail - should return false',
      predicate: isSuccess,
      invariant: fail({ message: 'some message' }),
      expectedPredicateResult: false,
    },
    {
      toString: () => 'isFail for Success - should return false',
      predicate: isFail,
      invariant: success(),
      expectedPredicateResult: false,
    },
  ]

  test.each(predicatesTestCases)('%s', ({ predicate, invariant, expectedPredicateResult }) => {
    expect(predicate(invariant)).toStrictEqual(expectedPredicateResult);
  })

  const failFactoryTestCases = [
    // Fail
    {
      toString: () => 'fail(object) - should properly create fail invariant',
      passedInfo: { message: 'fail 1' } as InvariantFailCustomInfo,
      expectedInvariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' } },
        ],
      },
    },
    {
      toString: () => 'fail(array) - should properly create fail invariant',
      passedInfo: [{ message: 'fail 1' }] as InvariantFailCustomInfo[],
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' } },
        ],
      },
    },
  ]

  test.each(failFactoryTestCases)('%s', ({ passedInfo, expectedInvariant }) => {
    expect(JSON.stringify(fail(passedInfo))).toEqual(JSON.stringify(expectedInvariant));
  })
});
