// @flow
/* eslint no-param-reassign:0 */
import uuid from 'uuid/v5';
import merge from 'lodash/merge';

import {
  LOADED_PROFILE_DATA,
  CHANGE_PROFILE_NAME,
  CHANGE_PROFILE,
  CORRECT_PROFILE_DATA
} from '../actions/types/profile';
import { setProfileData } from '../utils/ProfileProvider';

// Type imports:
import type { actionType } from '../_types/ActionType';
import type { ProfileData, Profile } from '../_types/Profile';

const defaultUUID = uuid('PROFILE_DEFAULT', '00000000-0000-0000-0000-000000000000');
const defaultProfileData: ProfileData = {
  currentProfile: defaultUUID,
  loadedProfiles: {}
};
defaultProfileData.loadedProfiles[defaultUUID] = {
  displayName: 'Default',
  uuid: defaultUUID
};
let isLoaded = false;

export default function profileReducer(
  state: ?ProfileData = defaultProfileData,
  action: actionType
) {
  let loadedProfiles: { [string]: Profile } = {};

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
