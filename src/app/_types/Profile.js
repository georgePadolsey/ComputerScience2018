// @flow
import { CHANGE_PROFILE, CHANGE_PROFILE_NAME, LOADED_PROFILE_DATA } from '../actions/profile';

/**
 * # Types
 */

export type Profile = {
  displayName: string,
  uuid: string
};

export type ProfileData = {|
  currentProfile: ?string,
  loadedProfiles: { [string]: Profile }
|};

export type Action = { +type: string };

export type ProfileAction =
  | { +type: typeof CHANGE_PROFILE, payload: string }
  | { +type: typeof CHANGE_PROFILE_NAME, payload: { uuid: string, displayName: string } }
  | { +type: typeof LOADED_PROFILE_DATA, payload: any }
  | Action;

export type GetState = () => ProfileData;
export type PromiseProfileAction = Promise<ProfileAction>;
