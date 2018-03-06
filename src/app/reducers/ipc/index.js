import { updateProfile, UPDATE_PROFILE } from '../../actions/profile';
import createIpc from 'redux-electron-ipc';

const map = {};

map[UPDATE_PROFILE] = updateProfile;

export const ipc = createIpc(map);
