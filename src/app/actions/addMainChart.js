// @flow
import * as ACTIONS from './types/addMainChart';

type AddMainChartAction = {
  type: $Keys<typeof ACTIONS>
};
export function show(): AddMainChartAction {
  return setShow(true);
}

export function hide(): AddMainChartAction {
  return setShow(false);
}

export function setShow(showMainChart: boolean): AddMainChartAction {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_SHOW,
    payload: showMainChart
  };
}

export function setSelectedExchange(selectedExchange: string): AddMainChartAction {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_SELECTED_EXCHANGE,
    payload: selectedExchange
  };
}

export function setSelectedSymbol(selectedSymbol: string): AddMainChartAction {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_SELECTED_SYMBOL,
    payload: selectedSymbol
  };
}
