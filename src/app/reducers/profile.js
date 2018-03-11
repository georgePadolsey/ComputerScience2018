// @flow

import {
  SET_OFFERED_CREATOR,
  LOADED_PROFILE_DATA,
  SHOW_PROFILE_CREATOR,
  HIDE_PROFILE_CREATOR,
  SET_PROFILE_CREATOR_STAGE
} from '../actions/profile';
import { setProfileData } from '../utils/ProfileProvider';
// import uuidv1 from '

export const STAGES = {
  ACCOUNT_ADDER: 'ACCOUNT_ADDER',
  ADD_BALANCE: 'ADD_BALANCE',
  ADD_EXCHANGE: 'ADD_EXCHANGE',
  ADD_WALLET: 'ADD_WALLET'
};

const defaultProfileData = {
  currentProfile: null,
  loadedProfiles: {},
  firstTime: true,
  profileCreatorStage: STAGES.ACCOUNT_ADDER
};
export default function profileReducer(state = defaultProfileData, action) {
  let ret = state;

  const saveData = () => {
    // save profile data to config
    setProfileData(ret);
  };

  // console.log(state);

  switch (action.type) {
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
      ret = Object.assign({}, state, { showProfileCreator: false, firstTime: false });
      saveData();
      break;
    case SET_PROFILE_CREATOR_STAGE:
      ret = Object.assign({}, state, { profileCreatorStage: action.payload });
      saveData();
      break;
    default:
      return state;
  }

  return ret;
}
