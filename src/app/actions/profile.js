// @flow
import type { Dispatch } from 'redux';

import getProfileData from '../utils/ProfileProvider';
import * as PROFILE_ACTIONS from './types/profile';
import type { ProfileData } from '../_types/Profile';

type ProfileAction = {
  type: $Keys<typeof PROFILE_ACTIONS>
};

export function changeProfile(uuid: string): ProfileAction {
  return {
    type: PROFILE_ACTIONS.CHANGE_PROFILE,
    payload: uuid
  };
}

export function changeProfileName(uuid: string, displayName: string): ProfileAction {
  return {
    type: PROFILE_ACTIONS.CHANGE_PROFILE_NAME,
    payload: {
      uuid,
      displayName
    }
  };
}

export function setExpiryTimeout(uuid: string, timeout: number): ProfileAction {
  return {
    type: PROFILE_ACTIONS.SET_EXPIRY_TIMEOUT,
    payload: {
      uuid,
      timeout
    }
  };
}

export function loadProfileData(): (Dispatch<*>) => Promise<ProfileAction> {
  return async dispatch => dispatch(loadedProfileData(await getProfileData()));
}

export function loadedProfileData(profileData: ?ProfileData): ProfileAction {
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

export function setCompareCurrency(uuid: string, compareCurrency: string): ProfileAction {
  return {
    type: PROFILE_ACTIONS.SET_COMPARE_CURRENCY,
    payload: {
      uuid,
      compareCurrency
    }
  };
}
