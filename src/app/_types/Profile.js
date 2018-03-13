// @flow

/**
 * # Enums
 * @see https://en.wikipedia.org/wiki/Enumerated_type
 */

/**
 * Profile Creator Stage type
 * @todo description
 */
export const PROFILE_CREATOR_STAGES = {
  ACCOUNT_ADDER: "ACCOUNT_ADDER",
  ADD_BALANCE: "ADD_BALANCE",
  ADD_EXCHANGE: "ADD_EXCHANGE",
  ADD_WALLET: "ADD_WALLET"
};

/**
 * # Types
 */

export type ProfileType = {
  displayName: string,
  uuid: string,
  isReal: boolean
};

export type ProfileCreatorStage = $Keys<typeof PROFILE_CREATOR_STAGES>;

export type ProfileData = {
  currentProfile: ?string,
  loadedProfiles: { [string]: ProfileType },
  firstTime: boolean,
  profileCreatorStage: ProfileCreatorStage
};
