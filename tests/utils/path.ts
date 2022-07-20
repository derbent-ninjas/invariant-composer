import { Fail, fail } from '../../src';
import { path as pathUtility } from '../../src/path';

describe('path', () => {
  const testCases = [
    {
      toString: () => 'path="pathA", ',
      path: 'pathA',
      invariant: fail({ message: 'fail 1' }),
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
        ]
      } as Fail,
    },
    {
      toString: () => 'path="pathA", ',
      path: 'pathB',
      invariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
        ],
      },
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathB.pathA' },
        ]
      } as Fail,
    },
    {
      toString: () => 'path="pathA", ',
      path: 'pathA',
      invariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' } },
          { customInfo: { message: 'fail 2' } },
          { customInfo: { message: 'fail 3' } },
        ],
      },
      expectedInvariant: {
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
      invariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathA' },
        ],
      },
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathB.pathA' },
        ]
      } as Fail,
    },
  ]

  test.each(testCases)('%s', ({ path, invariant, expectedInvariant }) => {
    const resultInvariant = pathUtility(path, invariant)
    expect(JSON.stringify(resultInvariant)).toStrictEqual(JSON.stringify(expectedInvariant))
  })
});
