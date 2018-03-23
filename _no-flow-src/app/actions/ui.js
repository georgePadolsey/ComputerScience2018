//

import getUIData from "../utils/UIProvider";

import * as UI_ACTIONS from "./types/ui";

export function setMainPanelEditMode(isEditMode) {
  return {
    type: UI_ACTIONS.SET_MAIN_PANEL_EDIT_MODE,
    payload: isEditMode
  };
}

export function showAddMainChart() {
  return setShowAddMainChart(true);
}

export function hideAddMainChart() {
  return setShowAddMainChart(false);
}

export function setShowAddMainChart(showMainChart) {
  return {
    type: UI_ACTIONS.SET_SHOW_ADD_MAIN_CHART,
    payload: showMainChart
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

export function loadUIData() {
  return async dispatch => {
    dispatch(loadedUIData(await getUIData()));
  };
}

export function setOfferedCreator(shown) {
  return {
    type: UI_ACTIONS.SET_OFFERED_CREATOR,
    payload: shown
  };
}

export function showProfileCreator() {
  return setShowProfileCreator(true);
}

export function hideProfileCreator() {
  return setShowProfileCreator(false);
}

export function setShowProfileCreator(show) {
  return {
    type: UI_ACTIONS.SET_SHOW_PROFILE_CREATOR,
    payload: show
  };
}

export function setProfileCreatorStage(stage) {
  return {
    type: UI_ACTIONS.SET_PROFILE_CREATOR_STAGE,
    payload: stage
  };
}

export function setProfileCreatorCurrentCurrency(currency) {
  return {
    type: UI_ACTIONS.SET_PROFILE_CREATOR_CURRENT_CURRENCY,
    payload: currency
  };
}
export function setProfileCreatorCurrentExchange(exchangeId) {
  return {
    type: UI_ACTIONS.SET_PROFILE_CREATOR_CURRENT_EXCHANGE,
    payload: exchangeId
  };
}
