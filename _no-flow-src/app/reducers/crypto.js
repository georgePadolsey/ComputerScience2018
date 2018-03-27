//
import merge from "lodash/merge";

import { LOADED_EXCHANGES } from "../actions/types/crypto";

const defaultCryptoState = {
  loadedExchanges: false
};

/**
 * This reducer is not saved to a data file
 * @param {*} state
 * @param {*} action
 */
export default function cryptoReducer(state = defaultCryptoState, action) {
  switch (action.type) {
    case LOADED_EXCHANGES:
      return merge({}, state, {
        loadedExchanges: true
      });
    default:
      return state;
  }
}
