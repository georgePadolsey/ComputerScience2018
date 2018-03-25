// @flow
import Store from 'electron-store';
import merge from 'lodash/merge';
import { CONFIG_KEY } from '../enc_keys';
import type { ProfileData } from '../_types/Profile';

const profilesStore = new Store({
  name: 'profiles',
  defaults: {},
  /**
   * Only encrypt the profile store when in production
   * This is to prevent users manually editing the file
   * @see https://github.com/sindresorhus/electron-store
   */
  encryptionKey: process.env.NODE_ENV === 'production' ? CONFIG_KEY : undefined
});

export default async function profileProvider(): Promise<?ProfileData> {
  console.log('loading-profiles');
  if (profilesStore.size === 0) {
    return undefined;
  }
  return profilesStore.store;
}

export function setProfileData(data: ProfileData) {
  profilesStore.store = merge({}, profilesStore.store, data);
}
