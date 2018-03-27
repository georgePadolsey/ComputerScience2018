//
import * as CRYPTO_ACTIONS from "./types/crypto";

export function setLoadedExchanges(loaded) {
  return {
    type: CRYPTO_ACTIONS.LOADED_EXCHANGES,
    payload: loaded
  };
}

export function loadedExchanges() {
  return setLoadedExchanges(true);
}
