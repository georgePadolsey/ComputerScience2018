//
/* eslint no-param-reassign:0 */
/**
 * The merge function supplied by lodash
 * allows us to merge the old state with
 * our new values
 * @see https://lodash.com/docs/4.17.5#merge
 */
import merge from "lodash/merge";

// Import all the different actionTypes dealt with
import {
  ADD_MAIN_CHART_SET_SHOW,
  ADD_MAIN_CHART_SET_SELECTED_EXCHANGE,
  ADD_MAIN_CHART_SET_SELECTED_SYMBOL,
  ADD_MAIN_CHART_SET_NAME
} from "../../actions/types/addMainChart";

// Types for FlowJS

// The default state for the store to take
const defaultMainChartState = {
  show: false // we don't want to the addMainChartDialog to show initially
};

/**
 * Pure reducer function which takes in the current
 * state of the redux store (or a portion of it)
 * and an action.
 * It then returns a new state modified according
 * to the action
 * @param {?addMainChartState} state the current state
 * @param {actionType} action the action to 'perform' on it
 * @returns Updated State
 */
export default function addMainChartReducer(
  /**
   * This will set the state to the default if undefined
   */
  state = defaultMainChartState,
  action
) {
  /**
   * We purposefully disable eslint no-param-reassign
   * due to reassign the parameter state throughout this method
   * I don't believe this is a case of bad practice,
   * as the alternative is creating a new redundant variable with
   * an abritary name. This way the meaning of the method is much clearer
   * @see https://eslint.org/docs/rules/no-param-reassign
   */

  /**
   * All actions passed in have a type which can be switched between
   * as needed with the following switch statement
   */
  switch (action.type) {
    // Set whether to show to the addMainChartDialog
    case ADD_MAIN_CHART_SET_SHOW:
      /**
       * Here we are replacing the state with a new one
       * which has show set to true/false depending on
       * the action payload
       */
      state = merge({}, state, { show: action.payload });
      break;
    case ADD_MAIN_CHART_SET_SELECTED_EXCHANGE:
      /**
       * Setting the selectedExchange based on action payload
       */
      state = merge({}, state, { selectedExchange: action.payload });
      break;
    case ADD_MAIN_CHART_SET_SELECTED_SYMBOL:
      /**
       * Setting the selectedSymbol based on action payload
       */
      state = merge({}, state, { selectedSymbol: action.payload });
      break;
    case ADD_MAIN_CHART_SET_NAME:
      /**
       * Setting the chartName based on action payload
       */
      state = merge({}, state, { chartName: action.payload });
      break;
    default:
      /**
       * In default case do nothing: this is because other
       * actions types that have nothing to do with this
       * reducer may be passed in.
       */
      break;
  }
  /**
   * Return the state which has been replaced or
   * not changed in anyway
   */
  return state;
}
