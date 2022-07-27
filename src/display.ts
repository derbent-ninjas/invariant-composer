import { Invariant, isSuccess } from './invariant';
import { FailResult, Result } from './types';

export const display = (invariant: Invariant): Result => {
  if (isSuccess(invariant)) {
    return {
      status: 'SUCCESS',
    }
  } else {
    const info = invariant.fail.reduce((info: FailResult['info'], fail) => {
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
    }
  }
}
