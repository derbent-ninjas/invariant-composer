import { success, assert, fail, path, InvariantError, INVARIANT_HAS_FAILED } from '../../src';

describe('assert', () => {
  const notThrowsTestCases = [
    {
      toString: () => 'path="cat", invariant=success - should not throw an error',
      path: 'cat',
      invariant: success(),
    }
  ]

  test.each(notThrowsTestCases)('%s', ({ path, invariant }) => {
    expect(() => assert(path, invariant)).not.toThrow();
  })

  const throwsTestCases = [
    {
      toString: () => 'path="cat", invariant=success - should not throw an error',
      path: 'cat',
      invariant: fail({ message: 'some invariant' }),
    }
  ]

  test.each(throwsTestCases)('%s', ({ path, invariant }) => {
    expect(() => assert(path, invariant)).toThrow(new InvariantError(INVARIANT_HAS_FAILED, invariant));
  })

  const throwsAndSetsPathTestCases = [
    {
      toString: () => 'path="cat", invariant=success - should not throw an error',
      path: 'cat',
      invariant: fail({ message: 'some invariant' }),
      expectedInvariant: path('cat', fail({ message: 'some invariant' }))
    }
  ]

  test.each(throwsAndSetsPathTestCases)('%s', ({ path, invariant, expectedInvariant }) => {
    try {
      assert(path, invariant)
      throw new Error('method must throw')
      // @ts-ignore
    } catch (error: InvariantError) {
      expect(error.invariant).toEqual(expectedInvariant)
    }
  })
});
