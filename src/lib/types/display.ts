import { Invariant, InvariantFailCustomInfo, Success } from '../../index';

export interface SuccessDisplay {
  status: 'SUCCESS'
}

export interface FailInfo {
  paths?: {
    [key: string]: InvariantFailCustomInfo[];
  }
  errorsWithoutPath?: InvariantFailCustomInfo[];
}

export interface FailDisplay {
  status: 'FAIL',
  info: FailInfo
}

export type Display<I extends Invariant> = I extends Success ? SuccessDisplay : FailDisplay
