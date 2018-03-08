// @flow
import getProfileData from '../utils/ProfileProvider';
import type { ProfileType } from '../_types/Profile';
import type { actionType } from '../_types/ActionType';

export const HYDRATE_PROFILE_DATA = 'HYDRATE_PROFILE_DATA';
export const LOADED_PROFILE_DATA = 'LOADED_PROFILE_DATA';
export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export const SET_OFFERED_CREATOR = 'SET_OFFERED_CREATOR';
export const SHOW_PROFILE_CREATOR = 'SHOW_PROFILE_CREATOR';
export const HIDE_PROFILE_CREATOR = 'HIDE_PROFILE_CREATOR';

export function changeProfile(newProfileUUID: string): actionType {
  return {
    type: CHANGE_PROFILE,
    payload: {
      newProfileUUID
    }
  };
}

export function setOfferedCreator(shown: boolean): actionType {
  return {
    type: SET_OFFERED_CREATOR,
    payload: shown
  };
}

export function loadProfileData() {
  return async (dispatch: actionType => mixed) =>
    dispatch(loadedProfileData(await getProfileData()));
}

export function showProfileCreator() {
  return {
    type: SHOW_PROFILE_CREATOR
  };
}

export function hideProfileCreator() {
  return {
    type: HIDE_PROFILE_CREATOR
  };
}

export function loadedProfileData(profileData: any): actionType {
  return {
    type: LOADED_PROFILE_DATA,
    payload: profileData
  };
}
