import { success, fail } from '../../src';
import { FailResult, SuccessResult } from '../../src';
import { result } from '../../src';

describe('result', () => {
  const testCases = [
    // Fail
    {
      toString: () => 'should properly parse fail',
      invariant: {
        ...fail({ message: 'fail 1' }),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathB.pathA' },
          { customInfo: { message: 'fail 4' }, path: 'pathA' },
          { customInfo: { message: 'fail 5' }, path: 'pathA' },
          { customInfo: { message: 'fail 6' }, path: 'pathA' },
          { customInfo: { message: 'fail 7' } },
          { customInfo: { message: 'fail 8' } },
          { customInfo: { message: 'fail 9' } },
        ]
      },
      expectedResult: {
        status: 'FAIL',
        info: {
          paths: {
            'pathB.pathA': [
              { message: 'fail 1' },
              { message: 'fail 2' },
              { message: 'fail 3' },
            ],
            'pathA': [
              { message: 'fail 4' },
              { message: 'fail 5' },
              { message: 'fail 6' },
            ]
          },
          errorsWithoutPath: [
            { message: 'fail 7' },
            { message: 'fail 8' },
            { message: 'fail 9' },
          ]
        },
      } as FailResult,
    },
    // Success
    {
      toString: () => 'should properly parse success',
      invariant: success(),
      expectedResult: {
        status: 'SUCCESS',
      } as SuccessResult,
    },
  ]

  test.each(testCases)('%s', ({ invariant, expectedResult }) => {
    expect(result(invariant)).toEqual(expectedResult)
  })
});
