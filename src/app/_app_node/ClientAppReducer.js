// @flow

import { UPDATE_PROFILE } from '../actions/profile';

export default async function clientAppReducer(...args) {
  console.log('IPC recieved', args);
  return [UPDATE_PROFILE, 'cake'];
}
