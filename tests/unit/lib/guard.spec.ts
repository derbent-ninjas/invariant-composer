import { Guard, Invariant, INVARIANT_HAS_FAILED, InvariantError, success, fail, isInvariantError } from '../../../src';

const successCanActivateFunction = (): Invariant => {
  return success();
}

const failCanActivateFunction = (): Invariant => {
  return fail({ message: 'some message' });
}

class ThrowsTestClass {
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

class PathTestClass {
  @Guard(failCanActivateFunction)
  methodWithFailCanActivate(num1: number, num2: number): number {
    return num1 + num2;
  }
}

describe('Guard', () => {
  test('methodWithSuccessCanActivate - should return sum', () => {
    const test = new ThrowsTestClass()

    expect(test.methodWithSuccessCanActivate(1, 1)).toStrictEqual(2);
  })

  test('asyncMethodWithSuccessCanActivate - should return sum', async () => {
    const test = new ThrowsTestClass()
    const result = await test.asyncMethodWithSuccessCanActivate(1, 1)

    expect(result).toStrictEqual(2);
  })

  test('methodWithFailCanActivate - should return sum', () => {
    const test = new ThrowsTestClass()

    expect(() => test.methodWithFailCanActivate(1, 1)).toThrow(new InvariantError(INVARIANT_HAS_FAILED, fail({ message: 'some message' })))
  })

  test('methodWithFailCanActivate - should return sum', () => {
    const test = new PathTestClass()

    try {
      test.methodWithFailCanActivate(1, 1)
    } catch (error: any) {
      if (isInvariantError(error)) {

        expect(
          error.invariant.fail.every(
            failMessage => failMessage.path === 'pathTestClass'
          )
        ).toStrictEqual(true);

      } else {
        throw new Error('test must throw Invariant Error');
      }
    }

  })

  test('methodWithFailCanActivate - should return sum', async () => {
    const test = new ThrowsTestClass()

    await expect(async () => test.asyncMethodWithFailCanActivate(1, 1))
      .rejects
      .toThrow(new InvariantError(INVARIANT_HAS_FAILED, fail({ message: 'some message' })))
  })
});
