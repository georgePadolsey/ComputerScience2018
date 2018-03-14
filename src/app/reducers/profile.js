// @flow
import uuid from 'uuid/v1';

import {
  SET_OFFERED_CREATOR,
  LOADED_PROFILE_DATA,
  SET_PROFILE_CREATOR_STAGE,
  CHANGE_PROFILE_NAME,
  SET_SHOW_PROFILE_CREATOR,
  CHANGE_PROFILE
} from '../actions/profile';
import { setProfileData } from '../utils/ProfileProvider';
import { PROFILE_CREATOR_STAGES } from '../_types/Profile';

// Type imports:
import type { ProfileData, Profile, ProfileAction } from '../_types/Profile';

const defaultUUID = uuid();
const defaultProfileData: ProfileData = {
  currentProfile: defaultUUID,
  loadedProfiles: {},
  firstTime: true,
  profileCreatorStage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
};
defaultProfileData.loadedProfiles[defaultUUID] = {
  displayName: 'Default',
  uuid: defaultUUID
};

export default function profileReducer(
  state: ProfileData = defaultProfileData,
  action: ProfileAction
) {
  let ret: ProfileData = state;

  const saveData = () => {
    // save profile data to config
    setProfileData(ret);
  };

  let loadedProfiles: { [string]: Profile } = {};

  switch (action.type) {
    case CHANGE_PROFILE:
      ret = { ...state, currentProfile: action.payload };
      saveData();
      break;
    case LOADED_PROFILE_DATA:
      ret = Object.assign({}, state, action.payload);
      saveData();
      break;
    case SET_OFFERED_CREATOR:
      ret = Object.assign({}, state, { offeredCreator: action.payload });
      saveData();
      break;
    case SET_SHOW_PROFILE_CREATOR:
      let newObj = {
        showProfileCreator: action.payload
      };
      if (!action.payload) {
        newObj = { ...newObj, firstTime: false };
      }
      ret = { ...state, ...newObj };
      saveData();
      break;
    case SET_PROFILE_CREATOR_STAGE:
      ret = Object.assign({}, state, { profileCreatorStage: action.payload });
      saveData();
      break;
    case CHANGE_PROFILE_NAME:
      loadedProfiles = {};
      loadedProfiles[action.payload.uuid] = { displayName: action.payload.displayName };
      console.log(loadedProfiles);
      ret = Object.assign({}, state, { loadedProfiles });
      saveData();
      break;
    default:
      return state;
  }

  return ret;
}
