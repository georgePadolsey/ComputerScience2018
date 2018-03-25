// @flow
import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import {
  LOADED_UI_DATA,
  SET_MAIN_PANEL_EDIT_MODE,
  UPDATE_MAIN_LAYOUTS
} from '../../actions/types/ui';
import type { actionType } from '../../_types/ActionType';
import setUIData from '../../utils/UIProvider';

import addMainChartReducer from './addMainChart';
import profileCreatorReducer from './profileCreator';

let isLoaded = false;

const defaultUIState: UIData = {
  mainPanelEditMode: false,
  mainPanelLayouts: {},
  offeredCreator: false
};

const generalUIReducer = combineReducers({
  addMainChart: addMainChartReducer,
  profileCreator: profileCreatorReducer
});

export default function uiReducer(state: ?UIData = defaultUIState, action: actionType) {
  switch (action.type) {
    case LOADED_UI_DATA:
      state = merge({}, state, action.payload);
      isLoaded = true;
      break;
    case SET_MAIN_PANEL_EDIT_MODE:
      state = merge({}, state, { mainPanelEditMode: action.payload });

      break;
    case UPDATE_MAIN_LAYOUTS:
      state = merge({}, state, { mainPanelLayouts: action.payload });

      break;
    default:
      break;
  }

  state = generalUIReducer(state, action);

  if (isLoaded && state != null) {
    setUIData(state);
  }
  return state;
}
