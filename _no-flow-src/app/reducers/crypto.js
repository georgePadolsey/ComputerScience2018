//
import merge from "lodash/merge";

import { LOADED_EXCHANGE } from "../actions/types/crypto";

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
      return merge({}, state, {
        loadedExchanges: [...state.loadedExchanges, ...action.payload]
      });
    default:
      return state;
  }
}
