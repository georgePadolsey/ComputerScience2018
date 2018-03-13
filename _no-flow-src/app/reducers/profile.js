//      
import uuid from 'uuid/v1';

import {
  SET_OFFERED_CREATOR,
  LOADED_PROFILE_DATA,
  SHOW_PROFILE_CREATOR,
  HIDE_PROFILE_CREATOR,
  SET_PROFILE_CREATOR_STAGE,
  CHANGE_PROFILE_NAME,
  CHANGE_PROFILE
} from '../actions/profile';
import { setProfileData } from '../utils/ProfileProvider';
import { PROFILE_CREATOR_STAGES } from '../_types/Profile';

// Type imports:
                                                        
                                                     

const defaultUUID = uuid();
const defaultProfileData              = {
  currentProfile: defaultUUID,
  loadedProfiles: {},
  firstTime: true,
  profileCreatorStage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
};
defaultProfileData.loadedProfiles[defaultUUID] = {
  displayName: 'Default'
};

export default function profileReducer(
  state              = defaultProfileData,
  action               
) {
  let ret = state;

  const saveData = () => {
    // save profile data to config
    setProfileData(ret);
  };

  let loadedProfiles = {};

  switch (action.type) {
    case CHANGE_PROFILE:
      ret = Object.assign({}, state, { currentProfile: action.payload });
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
    case SHOW_PROFILE_CREATOR:
      ret = Object.assign({}, state, { showProfileCreator: true });
      saveData();
      break;
    case HIDE_PROFILE_CREATOR:
      ret = Object.assign({}, state, {
        showProfileCreator: false,
        firstTime: false
      });
      saveData();
      break;
    case SET_PROFILE_CREATOR_STAGE:
      ret = Object.assign({}, state, { profileCreatorStage: action.payload });
      saveData();
      break;
    case CHANGE_PROFILE_NAME:
      loadedProfiles = {};
      loadedProfiles[action.payload.uuid] = { displayName: action.payload.displayName };
      ret = Object.assign({}, state, { loadedProfiles });
      saveData();
      break;
    default:
      return state;
  }

  return ret;
}
