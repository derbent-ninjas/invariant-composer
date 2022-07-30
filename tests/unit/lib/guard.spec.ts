import { Guard, Invariant, INVARIANT_HAS_FAILED, InvariantError, success, fail } from '../../../src';

const successCanActivateFunction = (): Invariant => {
  return success();
}

const failInvariant = fail({ message: 'some message' })
const failCanActivateFunction = (): Invariant => {
  return failInvariant;
}

class TestClass {
  @Guard(successCanActivateFunction)
  methodWithSuccessCanActivate(num1: number, num2: number): number {
    return num1 + num2;
  }

  @Guard(successCanActivateFunction)
  async asyncMethodWithSuccessCanActivate(num1: number, num2: number): Promise<number> {
    return num1 + num2;
  }

  @Guard(failCanActivateFunction)
  methodWithFailCanActivate(num1: number, num2: number): number {
    return num1 + num2;
  }

  @Guard(failCanActivateFunction)
  async asyncMethodWithFailCanActivate(num1: number, num2: number): Promise<number> {
    return num1 + num2;
  }
}

describe('Guard', () => {
  test('methodWithSuccessCanActivate - should return sum', () => {
    const test = new TestClass()

    expect(test.methodWithSuccessCanActivate(1, 1)).toStrictEqual(2);
  })

  test('asyncMethodWithSuccessCanActivate - should return sum', async () => {
    const test = new TestClass()
    const result = await test.asyncMethodWithSuccessCanActivate(1, 1)

    expect(result).toStrictEqual(2);
  })

  test('methodWithFailCanActivate - should return sum', () => {
    const test = new TestClass()

    expect(() => test.methodWithFailCanActivate(1, 1)).toThrow(new InvariantError(INVARIANT_HAS_FAILED, failInvariant))
  })

  test('methodWithFailCanActivate - should return sum', async () => {
    const test = new TestClass()

    await expect(async () => test.asyncMethodWithFailCanActivate(1, 1))
      .rejects
      .toThrow(new InvariantError(INVARIANT_HAS_FAILED, failInvariant))
  })
});
