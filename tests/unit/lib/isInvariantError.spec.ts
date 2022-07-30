import { InvariantError, fail } from '../../../src';
import { isInvariantError } from '../../../src';

describe('isInvariantError', () => {
  const testCases = [
    {
      toString: () => 'not InvariantError - should return false',
      error: new Error('message'),
      expectedPredicateResult: false,
    },
    {
      toString: () => 'InvariantError - should return true',
      error: new InvariantError('message', fail({ message: 'some error' })),
      expectedPredicateResult: true,
    },
  ]

  test.each(testCases)('%s', ({ error, expectedPredicateResult }) => {
    expect(isInvariantError(error)).toStrictEqual(expectedPredicateResult);
  })
});
