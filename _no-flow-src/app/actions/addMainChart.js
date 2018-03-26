//
import * as ACTIONS from "./types/addMainChart";

export function show() {
  return setShow(true);
}

export function hide() {
  return setShow(false);
}

export function setShow(showMainChart) {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_SHOW,
    payload: showMainChart
  };
}

export function setSelectedExchange(selectedExchange) {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_SELECTED_EXCHANGE,
    payload: selectedExchange
  };
}

export function setSelectedSymbol(selectedSymbol) {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_SELECTED_SYMBOL,
    payload: selectedSymbol
  };
}

export function setChartName(chartName) {
  return {
    type: ACTIONS.ADD_MAIN_CHART_SET_NAME,
    payload: chartName
  };
}
