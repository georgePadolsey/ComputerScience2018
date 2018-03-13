//      
import Store from 'electron-store';
import { CONFIG_KEY } from '../enc_keys';
                                                     

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

export default async function profileProvider()      {
  console.log('loading-profiles');
  return profilesStore.store;
}

export function setProfileData(data             ) {
  profilesStore.store = data;
}
