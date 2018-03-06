// @flow

import { UPDATE_PROFILE, LOAD_PROFILES } from '../actions/profile';

const defaultProfile = { isReal: false, displayName: 'George' };
export default function profileReducer(state = defaultProfile, action) {
  // console.log(state);
  switch (action.type) {
    case UPDATE_PROFILE:
      return Object.assign({}, state, { args: action.args });
  }
  return state;
}
