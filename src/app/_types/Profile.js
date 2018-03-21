// @flow

/**
 * # Types
 */

export type Profile = {
  displayName: string,
  uuid: string
};

export type ProfileData = {
  +currentProfile: ?string,
  +loadedProfiles: { [string]: Profile }
};
