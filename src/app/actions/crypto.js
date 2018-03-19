// @flow
import type { actionType } from '../_types/ActionType';

export const LOADED_EXCHANGE = 'LOADED_EXCHANGE';

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
