import { Invariant, isSuccess } from './invariant';
import { FailDisplay, Display } from './types';

export const display = <I extends Invariant>(invariant: I): Display<typeof invariant> => {
  if (isSuccess(invariant)) {
    return {
      status: 'SUCCESS',
    } as Display<typeof invariant>
  } else {
    const info = invariant.fail.reduce((info: FailDisplay['info'], fail) => {
      if (!fail.path) {
        if (!info.errorsWithoutPath) {
          info.errorsWithoutPath = [fail.customInfo];
        } else {
          info.errorsWithoutPath.push(fail.customInfo);
        }
      } else {
        if (!info.paths) {
          info.paths = {}
        }

        if (!info.paths[fail.path]) {
          info.paths[fail.path] = [fail.customInfo]
        } else {
          info.paths[fail.path].push(fail.customInfo)
        }
      }

      return info
    }, {})

    return {
      status: 'FAIL',
      info,
    } as Display<typeof invariant>
  }
}
