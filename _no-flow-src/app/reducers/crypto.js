//

import { LOADED_EXCHANGE } from "../actions/crypto";

const defaultCryptoState = {
  loadedExchanges: []
};

/**
 * This reducer is not saved to a data file
 * @param {*} state
 * @param {*} action
 */
export default function cryptoReducer(state = defaultCryptoState, action) {
  switch (action.type) {
    case LOADED_EXCHANGE:
      return Object.assign({}, state, {
        loadedExchanges: [...state.loadedExchanges, ...action.payload]
      });
    default:
      return state;
  }
}
