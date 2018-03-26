//
/* eslint no-param-reassign:0 */
import merge from "lodash/merge";

import {
  ADD_MAIN_CHART_SET_SHOW,
  ADD_MAIN_CHART_SET_SELECTED_EXCHANGE,
  ADD_MAIN_CHART_SET_SELECTED_SYMBOL,
  ADD_MAIN_CHART_SET_NAME
} from "../../actions/types/addMainChart";

const defaultMainChartState = {
  show: false
};

export default function addMainChartReducer(
  state = defaultMainChartState,
  action
) {
  switch (action.type) {
    case ADD_MAIN_CHART_SET_SHOW:
      state = merge({}, state, { show: action.payload });
      break;
    case ADD_MAIN_CHART_SET_SELECTED_EXCHANGE:
      state = merge({}, state, { selectedExchange: action.payload });
      break;
    case ADD_MAIN_CHART_SET_SELECTED_SYMBOL:
      state = merge({}, state, { selectedSymbol: action.payload });
      break;
    case ADD_MAIN_CHART_SET_NAME:
      state = merge({}, state, { chartName: action.payload });
      break;
    default:
      break;
  }
  return state;
}
