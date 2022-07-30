import { Invariant } from '../functions';
import { assert } from './assert';
import { lowercaseFirstChar } from '../../shared/utils/lowercaseFirstChar';

export function Guard(canActivateFn: (...args: any[]) => Invariant): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const oldMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const canActivate = canActivateFn(...args);
      assert(lowercaseFirstChar(target.constructor.name), canActivate);

      return oldMethod.apply(this, args)
    }
  }
}
