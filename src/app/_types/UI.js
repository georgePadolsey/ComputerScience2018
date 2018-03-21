// @flow
// import { PROFILE_CREATOR_STAGES } from '../actions/ui';

const PROFILE_CREATOR_STAGES = {
  ACCOUNT_ADDER: 'ACCOUNT_ADDER',
  ADD_BALANCE: 'ADD_BALANCE',
  ADD_EXCHANGE: 'ADD_EXCHANGE',
  ADD_WALLET: 'ADD_WALLET'
};

export type ProfileCreatorStage = $Keys<typeof PROFILE_CREATOR_STAGES>;

export type MainLayout = {
  [string]: Array<{
    w: number,
    h: number,
    x: number,
    y: number,
    i: string,
    moved: boolean,
    static: boolean
  }>
};

export type UIData = {
  +mainPanelEditMode: boolean,
  +mainPanelLayouts: MainLayout,
  +showAddMainChart: boolean,
  +offeredCreator: boolean,
  +showProfileCreator: boolean,
  +profileCreatorStage: ProfileCreatorStage,
  +firstTime: boolean
};
