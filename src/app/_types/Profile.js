// @flow

/**
 * # Types
 */

const PORTFOLIO_TYPE = {
  BALANCE: 'BALANCE',
  EXCHANGE: 'EXCHANGE',
  WALLET: 'WALLET'
};

export type Portfolio =
  | {
      type: typeof PORTFOLIO_TYPE.BALANCE,
      name: string,
      currency: string,
      amount: number
    }
  | {
      type: typeof PORTFOLIO_TYPE.EXCHANGE,
      exchange: string,
      name: string,
      apiKey: string,
      apiSecret: string
    };

export type Profile = {
  displayName: string,
  uuid: string,
  expiryTimeout: number,
  compareCurrency?: string
};

export type ProfileData = {
  +currentProfile: ?string,
  +loadedProfiles: { [string]: Profile }
};
