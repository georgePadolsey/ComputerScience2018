// @flow
import * as CRYPTO_ACTIONS from './types/crypto';

type CryptoAction = {
  type: $Keys<typeof CRYPTO_ACTIONS>
};

export function setLoadedExchanges(loaded: boolean): CryptoAction {
  return {
    type: CRYPTO_ACTIONS.LOADED_EXCHANGES,
    payload: loaded
  };
}

export function loadedExchanges(): CryptoAction {
  return setLoadedExchanges(true);
}
