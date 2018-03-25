//

import { LOADED_EXCHANGE } from "./types/crypto";

export function loadedExchange(exchangeId) {
  return {
    type: LOADED_EXCHANGE,
    payload: [exchangeId]
  };
}
export function loadedExchanges(exchangeIds) {
  return {
    type: LOADED_EXCHANGE,
    payload: exchangeIds
  };
}
