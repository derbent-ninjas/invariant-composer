import {
  Fail,
  fail,
  Invariant,
  compose,
  NonEmptyArray,
  Success,
  success,
} from '../../src'

describe('compose', () => {
  const failMessagesTestCases = [
    // Fail
    {
      toString: () => '3 failed invariants - should return invariant with 3 elements in customInfo Array',
      passedInvariants: [
        fail({ message: 'fail 1' }),
        fail({ message: 'fail 2' }),
        fail({ message: 'fail 3' }),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' } },
          { customInfo: { message: 'fail 2' } },
          { customInfo: { message: 'fail 3' } },
        ]
      } as Fail,
    },
    {
      toString: () => '3 failed invariants with path - should return invariant with 3 elements in customInfo Array',
      passedInvariants: [
        { ...fail({ message: 'fail 1' }), fail: [{ customInfo: { message: 'fail 1' }, path: 'pathA' }]},
        { ...fail({ message: 'fail 2' }), fail: [{ customInfo: { message: 'fail 2' }, path: 'pathA' }]},
        { ...fail({ message: 'fail 3' }), fail: [{ customInfo: { message: 'fail 3' }, path: 'pathB' }]},
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' }, path: 'pathA' },
          { customInfo: { message: 'fail 2' }, path: 'pathA' },
          { customInfo: { message: 'fail 3' }, path: 'pathB' },
        ]
      } as Fail,
    },
    {
      toString: () => '3 failed invariants, 4 succeeded - should return invariant with 3 elements in customInfo Array',
      passedInvariants: [
        success(),
        fail({ message: 'fail 1' }),
        success(),
        fail({ message: 'fail 2' }),
        success(),
        fail({ message: 'fail 3' }),
        success(),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' } },
          { customInfo: { message: 'fail 2' } },
          { customInfo: { message: 'fail 3' } },
        ],
      } as Fail,
    },
    {
      toString: () => '2 fails with 5 fail messages - should one invariant with 4 fail messages',
      passedInvariants: [
        fail([{ message: 'fail 1' }, { message: 'fail 2' }, { message: 'fail 3' }]),
        fail([{ message: 'fail 4' }, { message: 'fail 5' }]),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        ...fail([{ message: 'fail 1' }]),
        fail: [
          { customInfo: { message: 'fail 1' } },
          { customInfo: { message: 'fail 2' } },
          { customInfo: { message: 'fail 3' } },
          { customInfo: { message: 'fail 4' } },
          { customInfo: { message: 'fail 5' } },
        ]
      } as Fail,
    },
    // Success
    {
      toString: () => '1 success - should return Success invariant',
      passedInvariants: [
        success(),
      ] as NonEmptyArray<Invariant>,
      expectedInvariant: {
        _tag: 'Success',
      } as Success,
    },
  ]

  test.each(failMessagesTestCases)('%s', ({ passedInvariants, expectedInvariant }) => {
    expect(JSON.stringify(compose(...passedInvariants))).toEqual(JSON.stringify(expectedInvariant))
  })
});
