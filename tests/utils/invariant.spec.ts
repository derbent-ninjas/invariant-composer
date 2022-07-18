import { Fail, fail, InvariantFailCustomInfo, isFail, isSuccess, success } from '../../src/invariant';

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

  test.each(predicatesTestCases)('%s', ({ predicate, invariant, expectedPredicateResult }) => {
    expect(predicate(invariant)).toStrictEqual(expectedPredicateResult);
  })

  const factoriesTestCases = [
    {
      toString: () => 'fail(object) - should properly create fail invariant',
      passedInfo: { failMessage: 'fail 1' } as InvariantFailCustomInfo,
      expectedInvariant: {
        _tag: 'Fail',
        fail: {
          customInfo: [{
            failMessage: 'fail 1',
          }],
        },
      } as Fail,
    },
    {
      toString: () => 'fail(array) - should properly create fail invariant',
      passedInfo: [{ failMessage: 'fail 1' }] as InvariantFailCustomInfo[],
      expectedInvariant: {
        _tag: 'Fail',
        fail: {
          customInfo: [{
            failMessage: 'fail 1',
          }],
        },
      } as Fail,
    }
  ]

  test.each(factoriesTestCases)('%s', ({ passedInfo, expectedInvariant }) => {
    expect(fail(passedInfo)).toStrictEqual(expectedInvariant);
  })
});
