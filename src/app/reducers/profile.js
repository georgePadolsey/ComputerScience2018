// @flow

import { LOADED_PROFILES } from '../actions/profile';
// import uuidv1 from '

const defaultProfile = {
  currentProfile: null,
  loadedProfiles: {}
};
export default function profileReducer(state = defaultProfile, action) {
  // console.log(state);
  switch (action.type) {
    case LOADED_PROFILES:
      return Object.assign({}, state, { loadedProfiles: action.payload });
  }
  return state;
}
