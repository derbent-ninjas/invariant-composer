import { fail, success, ifExists } from '../../../src';

describe('ifExists', () => {
  const testCases = [
    {
      toString: () => 'property=undefined, fnInvariant return fail - should return success',
      property: undefined,
      fnInvariant: () => fail({ message: 'fail message' }),
      expectedInvariant: success(),
    },
    {
      toString: () => 'property=1, fnInvariant return fail - should return fail',
      property: 1,
      fnInvariant: () => fail({ message: 'fail message' }),
      expectedInvariant: fail({ message: 'fail message' }),
    },
    {
      toString: () => 'property=1, fnInvariant return success - should return success',
      property: 1,
      fnInvariant: () => success(),
      expectedInvariant: success(),
    }
  ]

  test.each(testCases)('%s', ({ property, fnInvariant, expectedInvariant }) => {
    expect(ifExists(property, fnInvariant)).toEqual(expectedInvariant);
  })
});
