// @flow

import {
  SET_OFFERED_CREATOR,
  LOADED_PROFILE_DATA,
  SHOW_PROFILE_CREATOR,
  HIDE_PROFILE_CREATOR
} from '../actions/profile';
import { setProfileData } from '../utils/ProfileProvider';
// import uuidv1 from '

const defaultProfileData = {
  currentProfile: null,
  loadedProfiles: {}
};
export default function profileReducer(state = defaultProfileData, action) {
  function saveData() {
    // save profile data to config
    setProfileData(ret);
  }

  // console.log(state);
  let ret = state;
  switch (action.type) {
    case LOADED_PROFILE_DATA:
      ret = Object.assign({}, state, action.payload);
      saveData();
      break;
    case SET_OFFERED_CREATOR:
      ret = Object.assign({}, state, { offeredCreator: action.payload });
      saveData();
      break;
    case SHOW_PROFILE_CREATOR:
      ret = Object.assign({}, state, { showProfileCreator: true });
      saveData();
      break;
    case HIDE_PROFILE_CREATOR:
      ret = Object.assign({}, state, { showProfileCreator: false });
      saveData();
      break;
    default:
      ret = state;
  }

  return ret;
}
