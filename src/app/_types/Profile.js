// @flow
import {
  CHANGE_PROFILE,
  CHANGE_PROFILE_NAME,
  SET_OFFERED_CREATOR,
  SET_PROFILE_CREATOR_STAGE,
  SET_SHOW_PROFILE_CREATOR,
  LOADED_PROFILE_DATA
} from '../actions/profile';

/**
 * # Enums
 * @see https://en.wikipedia.org/wiki/Enumerated_type
 */

/**
 * Profile Creator Stage type
 * @todo description
 */
export const PROFILE_CREATOR_STAGES = {
  ACCOUNT_ADDER: 'ACCOUNT_ADDER',
  ADD_BALANCE: 'ADD_BALANCE',
  ADD_EXCHANGE: 'ADD_EXCHANGE',
  ADD_WALLET: 'ADD_WALLET'
};

/**
 * # Types
 */

export type Profile = {
  displayName: string,
  uuid: string
};

export type ProfileCreatorStage = $Keys<typeof PROFILE_CREATOR_STAGES>;

export type ProfileData = {
  currentProfile: ?string,
  loadedProfiles: { [string]: Profile },
  firstTime: boolean,
  profileCreatorStage: ProfileCreatorStage
};

export type Action = { +type: string };

export type ProfileAction =
  | { +type: typeof CHANGE_PROFILE, payload: string }
  | { +type: typeof CHANGE_PROFILE_NAME, payload: { uuid: string, displayName: string } }
  | { +type: typeof SET_OFFERED_CREATOR, payload: boolean }
  | { +type: typeof SET_PROFILE_CREATOR_STAGE, payload: ProfileCreatorStage }
  | { +type: typeof SET_SHOW_PROFILE_CREATOR, payload: boolean }
  | { +type: typeof LOADED_PROFILE_DATA, payload: any }
  | Action;

export type GetState = () => ProfileData;
export type PromiseProfileAction = Promise<ProfileAction>;
