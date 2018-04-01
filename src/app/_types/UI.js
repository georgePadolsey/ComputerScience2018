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
  chartName?: string,
  selectedExchange?: string,
  selectedSymbol?: string
};

export type ProfileCreatorState = {
  +show: boolean,
  +stage: ProfileCreatorStage,
  +firstTime: boolean,
  +exchangeSelected?: ?string,
  +currencySelected?: ?string,
  +balanceName?: ?string,
  +balanceAmount?: ?number
};

export type MainPanelChart = {
  chartName: string,
  key: string,
  exchangeId: string,
  symbolId: string
};

export type SettingsState = {
  +show: boolean
};

export type UIData = {
  +mainPanelLayouts: MainLayout,
  mainPanelCharts: MainPanelChart[],
  +profileCreatorState?: ProfileCreatorState,
  +settingsState?: SettingsState,
  +addMainChartState?: addMainChartState
};
