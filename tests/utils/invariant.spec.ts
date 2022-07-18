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

  const pathTestCase = [
    {
      toString: () => 'path="pathA", ',
      path: 'pathA',
      startInvariant: fail({ message: 'fail 1' }),
      resultInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
        ]
      } as Fail,
    },
    {
      toString: () => 'path="pathA", ',
      path: 'pathB',
      startInvariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
        ],
      },
      resultInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathB.pathA' },
        ]
      } as Fail,
    },
    {
      toString: () => 'path="pathA", ',
      path: 'pathA',
      startInvariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' } },
          { customInfo: { message: 'fail 2' } },
          { customInfo: { message: 'fail 3' } },
        ],
      },
      resultInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathA' },
        ]
      } as Fail,
    },
    {
      toString: () => 'path="pathA", ',
      path: 'pathB',
      startInvariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathA' },
        ],
      },
      resultInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathB.pathA' },
        ]
      } as Fail,
    },
  ]

  test.each(pathTestCase)('%s', ({ path, startInvariant, resultInvariant }) => {
    startInvariant.path(path)
    expect(JSON.stringify(startInvariant)).toStrictEqual(JSON.stringify(resultInvariant))
  })
});
