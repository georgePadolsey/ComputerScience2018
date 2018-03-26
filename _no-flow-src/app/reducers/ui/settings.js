//
/* eslint no-param-reassign:0 */
import merge from "lodash/merge";

import { SETTINGS_SET_SHOW } from "../../actions/types/settings";

const defaultSettingsState = {
  show: false
};

export default function addMainChartReducer(
  state = defaultSettingsState,
  action
) {
  switch (action.type) {
    case SETTINGS_SET_SHOW:
      state = merge({}, state, { show: action.payload });
      break;
    default:
      break;
  }
  return state;
}
