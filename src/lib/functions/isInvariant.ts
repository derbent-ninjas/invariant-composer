import { Invariant } from '../index';

export const isInvariant = (candidate: any): candidate is Invariant => {
  return candidate?._tag === 'Success' || candidate?._tag === 'Fail';
}
