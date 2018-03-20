// @flow
import getProfileData from "../utils/ProfileProvider";
import * as PROFILE_ACTIONS from "./types/profile";
import type { Dispatch } from "redux";

type ProfileAction = {
  +type: $Keys<typeof PROFILE_ACTIONS>
};

export function changeProfile(uuid: string): ProfileAction {
  return {
    type: PROFILE_ACTIONS.CHANGE_PROFILE,
    payload: uuid
  };
}

export function changeProfileName(
  uuid: string,
  displayName: string
): ProfileAction {
  return {
    type: PROFILE_ACTIONS.CHANGE_PROFILE_NAME,
    payload: {
      uuid,
      displayName
    }
  };
}

export function loadProfileData(): (Dispatch<*>) => Promise<void> {
  return async dispatch => dispatch(loadedProfileData(await getProfileData()));
}

export function loadedProfileData(profileData: any): ProfileAction {
  return {
    type: PROFILE_ACTIONS.LOADED_PROFILE_DATA,
    payload: profileData
  };
}
