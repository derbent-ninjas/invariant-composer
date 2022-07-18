import { InvariantFailCustomInfo } from '../invariant';

export interface SuccessResult {
  status: 'SUCCESS'
}

export interface FailInfo {
  paths?: {
    [key: string]: InvariantFailCustomInfo[];
  }
  errorsWithoutPath?: InvariantFailCustomInfo[];
}

export interface FailResult {
  status: 'FAIL',
  info: FailInfo
}

export type Result = SuccessResult | FailResult
