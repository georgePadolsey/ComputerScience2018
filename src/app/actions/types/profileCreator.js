// @flow
export const PROFILE_CREATOR_SET_STAGE = 'PROFILE_CREATOR_SET_STAGE';
export const PROFILE_CREATOR_SET_SHOW = 'PROFILE_CREATOR_SET_SHOW';
export const PROFILE_CREATOR_SET_CURRENT_CURRENCY =
  'PROFILE_CREATOR_SET_CURRENT_CURRENCY';
export const PROFILE_CREATOR_SET_CURRENT_EXCHANGE =
  'PROFILE_CREATOR_SET_CURRENT_EXCHANGE';
export const PROFILE_CREATOR_SET_OFFERED = 'PROFILE_CREATOR_SET_OFFERED';
export const PROFILE_CREATOR_SET_BALANCE_NAME =
  'PROFILE_CREATOR_SET_BALANCE_NAME';
export const PROFILE_CREATOR_SET_BALANCE_AMOUNT =
  'PROFILE_CREATOR_SET_BALANCE_AMOUNT';

/**
 * Profile Creator Stage type
 * @todo description
 */
export const PROFILE_CREATOR_STAGES = {
  ACCOUNT_ADDER: 'ACCOUNT_ADDER',
  ADD_BALANCE: 'ADD_BALANCE',
  ADD_EXCHANGE: 'ADD_EXCHANGE',
  ADD_WALLET: 'ADD_WALLET',
  PROFILE_SETTINGS: 'PROFILE_SETTINGS'
};

export type ProfileCreatorStage = $Keys<typeof PROFILE_CREATOR_STAGES>;
