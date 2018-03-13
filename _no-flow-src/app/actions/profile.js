//      
import getProfileData from '../utils/ProfileProvider';
                                                                                                  

export const HYDRATE_PROFILE_DATA = 'HYDRATE_PROFILE_DATA';
export const LOADED_PROFILE_DATA = 'LOADED_PROFILE_DATA';
export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export const SET_OFFERED_CREATOR = 'SET_OFFERED_CREATOR';
export const SHOW_PROFILE_CREATOR = 'SHOW_PROFILE_CREATOR';
export const HIDE_PROFILE_CREATOR = 'HIDE_PROFILE_CREATOR';
export const SET_PROFILE_CREATOR_STAGE = 'SET_PROFILE_CREATOR_STAGE';
export const CHANGE_PROFILE_NAME = 'CHANGE_PROFILE_NAME';

export function changeProfile(uuid        )                {
  return {
    type: CHANGE_PROFILE,
    payload: uuid
  };
}

export function changeProfileName(uuid        , displayName        )                {
  return {
    type: CHANGE_PROFILE_NAME,
    payload: {
      uuid,
      displayName
    }
  };
}

export function setOfferedCreator(shown         )                {
  return {
    type: SET_OFFERED_CREATOR,
    payload: shown
  };
}

export function setProfileCreatorStage(stage                     )                {
  return {
    type: SET_PROFILE_CREATOR_STAGE,
    payload: stage
  };
}

export function loadProfileData()      {
  return async dispatch => dispatch(loadedProfileData(await getProfileData()));
}

export function showProfileCreator()                {
  return {
    type: SHOW_PROFILE_CREATOR
  };
}

export function hideProfileCreator() {
  return {
    type: HIDE_PROFILE_CREATOR
  };
}

export function loadedProfileData(profileData     )                {
  return {
    type: LOADED_PROFILE_DATA,
    payload: profileData
  };
}
