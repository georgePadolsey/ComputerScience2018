// @flow
import getProfiles from '../utils/ProfileProvider';
import type { ProfileType } from '../_types/Profile';

type actionType = {
  +type: string,
  payload: any
};

export const LOAD_PROFILES = 'LOAD_PROFILES';
export const LOADED_PROFILES = 'LOADED_PROFILES';
export const CHANGE_PROFILE = 'CHANGE_PROFILE';

export function changeProfile(newProfileUUID: string): actionType {
  return {
    type: CHANGE_PROFILE,
    payload: {
      newProfileUUID
    }
  };
}

export function loadProfiles() {
  return async (dispatch: actionType => mixed) => dispatch(loadedProfiles(await getProfiles()));
}

export function loadedProfiles(profiles: { [string]: ProfileType }): actionType {
  return {
    type: LOADED_PROFILES,
    payload: profiles
  };
}
