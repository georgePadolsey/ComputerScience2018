// @flow

/**
 * # Types
 */

export type Profile = {
  displayName: string,
  uuid: string,
  expiryTimeout: number
};

export type ProfileData = {
  +currentProfile: ?string,
  +loadedProfiles: { [string]: Profile }
};
