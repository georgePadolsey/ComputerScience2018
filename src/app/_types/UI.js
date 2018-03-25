// @flow
import type { ProfileCreatorStage } from '../actions/types/profileCreator';

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

export type addMainChartState = {
  +show: boolean,
  selectedExchange?: string,
  selectedSymbol?: string
};

export type ProfileCreatorState = {
  +show: boolean,
  +stage: ProfileCreatorStage,
  +firstTime: boolean,
  +offered: boolean,
  +exchangeSelected?: string,
  +currencySelected?: string
};

export type GenUIData = {
  +mainPanelEditMode: boolean
};

export type UIData = GenUIData & {
  +mainPanelLayouts: MainLayout,
  +profileCreatorState: ProfileCreatorState,
  +addMainChartState: addMainChartState
};
