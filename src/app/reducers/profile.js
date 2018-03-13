// @flow
import {
  SET_OFFERED_CREATOR,
  LOADED_PROFILE_DATA,
  SHOW_PROFILE_CREATOR,
  HIDE_PROFILE_CREATOR,
  SET_PROFILE_CREATOR_STAGE
} from "../actions/profile";
import { setProfileData } from "../utils/ProfileProvider";
import { PROFILE_CREATOR_STAGES } from "../_types/Profile";

// Type imports:
import type { actionType } from "../_types/ActionType";
import type { ProfileData } from "../_types/Profile";

const defaultProfileData: ProfileData = {
  currentProfile: null,
  loadedProfiles: {},
  firstTime: true,
  profileCreatorStage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
};

export default function profileReducer(
  state: ProfileData = defaultProfileData,
  action: actionType
) {
  let ret = state;

  const saveData = () => {
    // save profile data to config
    setProfileData(ret);
  };

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
    default:
      return state;
  }

  return ret;
}
