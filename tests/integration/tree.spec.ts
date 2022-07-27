import { compose, display, success, fail, SuccessResult, path, FailResult } from '../../src';

describe('Integration of compose methods and invariants', () => {
  const testCases = [
    {
      toString: () => 'success - should properly create result',
      tree: display(
        path('deepnessA', compose(
          path('deepnessA-B1', success()),
          path(
            'deepnessA-B2',
            compose(path('deepnessA-B2-C', success()))
          ),
          path('deepnessA-B3', success()),
        ))
      ),
      expectedResult: {
        status: 'SUCCESS',
      } as SuccessResult,
    },
    {
      toString: () => '1: fail - should properly create result',
      tree: display(
        path('deepnessA', compose(
          path('deepnessA-B1', success()),
          path(
            'deepnessA-B2',
            compose(path('deepnessA-B2-C', fail({ message: 'fail 1'})))
          ),
          path('deepnessA-B3', success()),
        ))
      ),
      expectedResult: {
        status: 'FAIL',
        info: {
          paths: {
            'deepnessA.deepnessA-B2.deepnessA-B2-C': [{ message: 'fail 1' }]
          }
        }
      } as FailResult,
    },
    {
      toString: () => '2: fail - should properly create result',
      tree: display(
        path('deepnessA', compose(
          path('deepnessA-B1', fail({ message: 'fail 1'})),
          path(
            'deepnessA-B2',
            compose(path('deepnessA-B2-C', fail({ message: 'fail 2'})))
          ),
          path('deepnessA-B3', success()),
        ))
      ),
      expectedResult: {
        status: 'FAIL',
        info: {
          paths: {
            'deepnessA.deepnessA-B1': [{ message: 'fail 1' }],
            'deepnessA.deepnessA-B2.deepnessA-B2-C': [{ message: 'fail 2' }],
          }
        }
      } as FailResult,
    },
    {
      toString: () => '3: fail - should properly create result',
      tree: display(
        path('deepnessA', compose(
          path('deepnessA-B1', fail({ message: 'fail 1'})),
          path(
            'deepnessA-B2',
            compose(
              path('deepnessA-B2-C1', fail({ message: 'fail 2'})),
              fail({ message: 'fail 3' }),
            )
          ),
          path('deepnessA-B3', success()),
        ))
      ),
      expectedResult: {
        status: 'FAIL',
        info: {
          paths: {
            'deepnessA.deepnessA-B1': [{ message: 'fail 1' }],
            'deepnessA.deepnessA-B2.deepnessA-B2-C1': [{ message: 'fail 2' }],
            'deepnessA.deepnessA-B2': [{ message: 'fail 3' }],
          },
        }
      } as FailResult,
    },
    {
      toString: () => '3: fail - should properly create result',
      tree: display(
        compose(
          fail({ message: 'fail 1' }),
          compose(fail({ message: 'fail 2' })),
        ),
      ),
      expectedResult: {
        status: 'FAIL',
        info: {
          errorsWithoutPath: [
            { message: 'fail 1' },
            { message: 'fail 2' },
          ],
        },
      } as FailResult,
    }
  ]

  test.each(testCases)('%s', ({ tree, expectedResult }) => {
    expect(tree).toEqual(expectedResult);
  })
});
