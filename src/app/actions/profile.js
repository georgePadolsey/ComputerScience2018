// @flow
import getProfileData from '../utils/ProfileProvider';
import * as PROFILE_ACTIONS from './types/profile';
import type { Dispatch } from 'redux';
import type { ProfileData } from '../_types/Profile';

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
  return async dispatch =>
    dispatch((loadedProfileData(await getProfileData()): Object));
}

export function loadedProfileData(profileData: ProfileData): ProfileAction {
  return {
    type: PROFILE_ACTIONS.LOADED_PROFILE_DATA,
    payload: profileData
  };
}

export function correctProfileData(): ProfileAction {
  return {
    type: PROFILE_ACTIONS.CORRECT_PROFILE_DATA
  };
}
