// @flow
/* eslint no-param-reassign:0 */
import merge from 'lodash/merge';

import { SETTINGS_SET_SHOW } from '../../actions/types/settings';
import type { actionType } from '../../_types/ActionType';
import type { SettingsState } from '../../_types/UI';

const defaultSettingsState: SettingsState = {
  show: false
};

export default function addMainChartReducer(
  state: ?SettingsState = defaultSettingsState,
  action: actionType
) {
  switch (action.type) {
    case SETTINGS_SET_SHOW:
      return merge({}, state, { show: action.payload });
    default:
      return state;
  }
}
