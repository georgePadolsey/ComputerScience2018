// @flow
import merge from 'lodash/merge';
import type { actionType } from '../_types/ActionType';
import type { CryptoState } from '../_types/Crypto';
import { LOADED_EXCHANGES } from '../actions/types/crypto';

const defaultCryptoState: CryptoState = {
  loadedExchanges: false
};

/**
 * This reducer is not saved to a data file
 * @param {*} state
 * @param {*} action
 */
export default function cryptoReducer(state: CryptoState = defaultCryptoState, action: actionType) {
  switch (action.type) {
    case LOADED_EXCHANGES:
      return merge({}, state, {
        loadedExchanges: true
      });
    default:
      return state;
  }
}
