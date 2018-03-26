//

import uuid from "uuid/v1";

import getUIData from "../utils/UIProvider";

import * as UI_ACTIONS from "./types/ui";

export function setMainPanelEditMode(isEditMode) {
  return {
    type: UI_ACTIONS.SET_MAIN_PANEL_EDIT_MODE,
    payload: isEditMode
  };
}

export function updateMainLayouts(layouts) {
  return {
    type: UI_ACTIONS.UPDATE_MAIN_LAYOUTS,
    payload: layouts
  };
}

export function loadedUIData(data) {
  return {
    type: UI_ACTIONS.LOADED_UI_DATA,
    payload: data
  };
}

export function addMainChart(chartName, exchangeId, symbolId) {
  return {
    type: UI_ACTIONS.ADD_MAIN_GRAPH,
    payload: {
      chartName,
      exchangeId,
      symbolId,
      key: uuid()
    }
  };
}

export function loadUIData() {
  return async dispatch => {
    dispatch(loadedUIData(await getUIData()));
  };
}
