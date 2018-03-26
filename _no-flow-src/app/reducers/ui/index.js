//
/* eslint-disable no-plusplus, no-param-reassign  */
import merge from "lodash/merge";
import concat from "lodash/concat";
import {
  LOADED_UI_DATA,
  SET_MAIN_PANEL_EDIT_MODE,
  ADD_MAIN_GRAPH,
  UPDATE_MAIN_LAYOUTS
} from "../../actions/types/ui";

import { setUIData } from "../../utils/UIProvider";

import addMainChartReducer from "./addMainChart";
import profileCreatorReducer from "./profileCreator";
import settingsReducer from "./settings";

let isLoaded = false;

const defaultUIState = {
  mainPanelEditMode: false,
  mainPanelCharts: [],
  mainPanelLayouts: {}
};

function ownReducer(finalReducers) {
  const finalReducerKeys = Object.keys(finalReducers);
  return (state, action) => {
    const nextState = {};
    for (let i = 0, l = finalReducerKeys.length; i < l; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      nextState[key] = reducer(state[key], action);
    }
    return merge({}, state, nextState);
  };
}

const generalUIReducer = ownReducer({
  addMainChartState: addMainChartReducer,
  profileCreatorState: profileCreatorReducer,
  settingsState: settingsReducer
});

export default function uiReducer(state = defaultUIState, action) {
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
    case ADD_MAIN_GRAPH:
      state = merge({}, state, {
        mainPanelCharts: concat(state.mainPanelCharts || [], action.payload)
      });
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
