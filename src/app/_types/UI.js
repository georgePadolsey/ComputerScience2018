// @flow
import type { PROFILE_CREATOR_STAGES } from '../actions/ui';

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

export type ProfileCreatorState = {
  +show: boolean,
  +stage: ProfileCreatorStage,
  +exchangeSelected?: string,
  +currencySelected?: string,
  +firstTime: boolean
};

export type UIData = {
  +mainPanelEditMode: boolean,
  +mainPanelLayouts: MainLayout,
  +showAddMainChart: boolean,
  +offeredCreator: boolean,
  +profileCreatorState: ProfileCreatorState
};
