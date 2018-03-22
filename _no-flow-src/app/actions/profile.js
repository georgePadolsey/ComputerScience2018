//

import getProfileData from "../utils/ProfileProvider";
import * as PROFILE_ACTIONS from "./types/profile";

export function changeProfile(uuid) {
  return {
    type: PROFILE_ACTIONS.CHANGE_PROFILE,
    payload: uuid
  };
}

export function changeProfileName(uuid, displayName) {
  return {
    type: PROFILE_ACTIONS.CHANGE_PROFILE_NAME,
    payload: {
      uuid,
      displayName
    }
  };
}

export function loadProfileData() {
  return async dispatch => dispatch(loadedProfileData(await getProfileData()));
}

export function loadedProfileData(profileData) {
  return {
    type: PROFILE_ACTIONS.LOADED_PROFILE_DATA,
    payload: profileData
  };
}

export function correctProfileData() {
  return {
    type: PROFILE_ACTIONS.CORRECT_PROFILE_DATA
  };
}
