// @flow
import type { actionType } from '../_types/ActionType';
import { LOADED_EXCHANGE } from './types/crypto';

export function loadedExchange(exchangeId: string): actionType {
  return {
    type: LOADED_EXCHANGE,
    payload: [exchangeId]
  };
}
export function loadedExchanges(exchangeIds: string[]): actionType {
  return {
    type: LOADED_EXCHANGE,
    payload: exchangeIds
  };
}
