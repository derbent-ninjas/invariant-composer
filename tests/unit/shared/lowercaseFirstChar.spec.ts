import { lowercaseFirstChar } from '../../../src/shared/utils/lowercaseFirstChar';

describe('lowercaseFirstChar', () => {
  const testCases = [
    {
      toString: () => 'passed=HeLLo - should return heLLo',
      passedString: 'HeLLo',
      expectedString: 'heLLo'
    },
    {
      toString: () => 'empty string - should return empty string',
      passedString: '',
      expectedString: ''
    }
  ]

  test.each(testCases)('%s', ({ passedString, expectedString }) => {
    expect(lowercaseFirstChar(passedString)).toStrictEqual(expectedString);
  })
});
