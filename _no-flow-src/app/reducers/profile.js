//
import uuid from "uuid/v1";

import {
  LOADED_PROFILE_DATA,
  CHANGE_PROFILE_NAME,
  CHANGE_PROFILE,
  CORRECT_PROFILE_DATA
} from "../actions/types/profile";
import { setProfileData } from "../utils/ProfileProvider";

// Type imports:

const defaultUUID = uuid();
const defaultProfileData = {
  currentProfile: defaultUUID,
  loadedProfiles: {}
};
defaultProfileData.loadedProfiles[defaultUUID] = {
  displayName: "Default",
  uuid: defaultUUID
};

export default function profileReducer(state = defaultProfileData, action) {
  let ret = state;

  const saveData = () => {
    // save profile data to config
    setProfileData(ret);
  };

  let loadedProfiles = {};

  switch (action.type) {
    case CHANGE_PROFILE:
      ret = { ...state, currentProfile: action.payload };
      saveData();
      break;
    case LOADED_PROFILE_DATA:
      ret = Object.assign({}, state, action.payload);
      saveData();
      break;
    case CHANGE_PROFILE_NAME:
      loadedProfiles = {};
      loadedProfiles[action.payload.uuid] = {
        displayName: action.payload.displayName
      };
      console.log(loadedProfiles);
      ret = Object.assign({}, state, { loadedProfiles });
      saveData();
      break;
    case CORRECT_PROFILE_DATA:
      // fix profile not loaded
      ret = Object.assign({}, state, {
        currentProfile: Object.keys(state.loadedProfiles)[0]
      });
      saveData();
      break;
    default:
      return state;
  }

  return ret;
}
