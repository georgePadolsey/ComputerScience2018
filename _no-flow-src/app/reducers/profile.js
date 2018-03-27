//
/* eslint no-param-reassign:0 */
import uuid from "uuid/v5";
import merge from "lodash/merge";

import {
  LOADED_PROFILE_DATA,
  CHANGE_PROFILE_NAME,
  CHANGE_PROFILE,
  CORRECT_PROFILE_DATA,
  SET_EXPIRY_TIMEOUT
} from "../actions/types/profile";
import { setProfileData } from "../utils/ProfileProvider";

// Type imports:

const defaultUUID = uuid(
  "PROFILE_DEFAULT",
  "00000000-0000-0000-0000-000000000000"
);
const defaultProfileData = {
  currentProfile: defaultUUID,
  loadedProfiles: {}
};
defaultProfileData.loadedProfiles[defaultUUID] = {
  displayName: "Default",
  uuid: defaultUUID,
  expiryTimeout: 3.6e6 // [1 hr]
};
let isLoaded = false;

export default function profileReducer(state = defaultProfileData, action) {
  let loadedProfiles = {};

  switch (action.type) {
    case CHANGE_PROFILE:
      state = { ...state, currentProfile: action.payload };
      break;
    case LOADED_PROFILE_DATA:
      state = merge({}, state, action.payload);
      isLoaded = true;
      break;
    case CHANGE_PROFILE_NAME:
      loadedProfiles = {};
      loadedProfiles[action.payload.uuid] = {
        displayName: action.payload.displayName
      };
      state = merge({}, state, { loadedProfiles });
      break;
    case SET_EXPIRY_TIMEOUT:
      loadedProfiles = {};
      loadedProfiles[action.payload.uuid] = {
        expiryTimeout: action.payload.timeout
      };
      state = merge({}, state, { loadedProfiles });
      break;
    case CORRECT_PROFILE_DATA:
      // fix profile not loaded
      state = merge({}, state, {
        currentProfile: Object.keys(state.loadedProfiles)[0]
      });
      break;

    default:
      break;
  }

  if (isLoaded && state != null) {
    // save profile data to config
    setProfileData(state);
  }
  return state;
}
