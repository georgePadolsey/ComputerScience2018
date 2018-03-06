// @flow
import { ipcRenderer } from 'electron';
import { send } from 'redux-electron-ipc';

type actionType = {
  +type: string
};

export const LOAD_PROFILES = 'LOAD_PROFILES';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export function loadProfiles() {
  return async dispatch => {
    dispatch(send('main', {
      type: LOAD_PROFILES
    }));
  };
}

export function updateProfile(evt, args) {
  return {
    type: UPDATE_PROFILE,
    args
  };
}
