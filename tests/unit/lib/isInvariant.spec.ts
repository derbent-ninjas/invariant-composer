import { isInvariant, success, fail  } from '../../../src';

describe('isInvariant', () => {
  const testCases = [
    // true
    {
      toString: () => 'passedValue=success - should return true',
      passedValue: success(),
      expectedResult: true,
    },
    {
      toString: () => 'passedValue=fail - should return true',
      passedValue: fail({ message: 'some message' }),
      expectedResult: true,
    },
    // false
    {
      toString: () => 'passedValue=undefined - should return false',
      passedValue: undefined,
      expectedResult: false,
    },
    {
      toString: () => 'passedValue=1 - should return false',
      passedValue: 1,
      expectedResult: false,
    },
    {
      toString: () => 'passedValue={ _tag: "banana" } - should return false',
      passedValue: { _tag: 'banana' },
      expectedResult: false,
    }
  ]

  test.each(testCases)('%s', ({ passedValue, expectedResult }) => {
    expect(isInvariant(passedValue)).toStrictEqual(expectedResult);
  })
});
