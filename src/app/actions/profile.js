// @flow
import getProfileData from '../utils/ProfileProvider';
import type { ProfileAction } from '../_types/Profile';

export const HYDRATE_PROFILE_DATA = 'HYDRATE_PROFILE_DATA';
export const LOADED_PROFILE_DATA = 'LOADED_PROFILE_DATA';
export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export const CHANGE_PROFILE_NAME = 'CHANGE_PROFILE_NAME';

export function changeProfile(uuid: string): ProfileAction {
  return {
    type: CHANGE_PROFILE,
    payload: uuid
  };
}

export function changeProfileName(uuid: string, displayName: string): ProfileAction {
  return {
    type: CHANGE_PROFILE_NAME,
    payload: {
      uuid,
      displayName
    }
  };
}

export function loadProfileData(): any {
  return async dispatch => dispatch(loadedProfileData(await getProfileData()));
}

export function loadedProfileData(profileData: any): ProfileAction {
  return {
    type: LOADED_PROFILE_DATA,
    payload: profileData
  };
}
