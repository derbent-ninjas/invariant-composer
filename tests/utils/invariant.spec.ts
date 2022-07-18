import { fail, isFail, isSuccess, success } from '../../src/invariant';

describe('Invariant', () => {
  const testCases = [
    {
      toString: () => 'isSuccess for Success - should return true',
      predicate: isSuccess,
      invariant: success(),
      expectedPredicateResult: true,
    },
    {
      toString: () => 'isFail for Fail - should return true',
      predicate: isFail,
      invariant: fail({ failMessage: 'some message' }),
      expectedPredicateResult: true,
    },
    {
      toString: () => 'isSuccess for Fail - should return false',
      predicate: isSuccess,
      invariant: fail({ failMessage: 'some message' }),
      expectedPredicateResult: false,
    },
    {
      toString: () => 'isFail for Success - should return false',
      predicate: isFail,
      invariant: success(),
      expectedPredicateResult: false,
    },
  ]

  test.each(testCases)('%s', ({ predicate, invariant, expectedPredicateResult }) => {
    expect(predicate(invariant)).toStrictEqual(expectedPredicateResult);
  })
});
