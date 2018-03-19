// @flow
import type { actionType } from '../_types/ActionType';
import type { CryptoState } from '../_types/Crypto';
import { LOADED_EXCHANGE } from '../actions/crypto';

const defaultCryptoState: CryptoState = {
  loadedExchanges: []
};

/**
 * This reducer is not saved to a data file
 * @param {*} state
 * @param {*} action
 */
export default function cryptoReducer(state: CryptoState = defaultCryptoState, action: actionType) {
  switch (action.type) {
    case LOADED_EXCHANGE:
      return Object.assign({}, state, {
        loadedExchanges: [...state.loadedExchanges, ...action.payload]
      });
    default:
      return state;
  }
}
