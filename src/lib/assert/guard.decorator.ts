import { Invariant, isInvariant } from '../functions';
import { assert } from './assert';
import { lowercaseFirstChar } from '../../shared/utils/lowercaseFirstChar';

/**
 * Decorated function throws `InvariantError` error if passed canActivate function will return fail invariant.
 *
 * note: canActivate function must have same parameters as decorated function and return Invariant
 *
 * @param canActivateFn
 * @constructor
 */
export function Guard(canActivateFn: (...args: any[]) => Invariant): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const oldMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const canActivate = canActivateFn(...args);

      assertIsInvariant(canActivate)

      assert(lowercaseFirstChar(target.constructor.name), canActivate);

      return oldMethod.apply(this, args)
    }
  }
}

const assertIsInvariant = (candidate: any) => {
  if (!isInvariant(candidate)) {
    throw new Error('@Guard decorator, canActivate function did not return invariant')
  }
}
