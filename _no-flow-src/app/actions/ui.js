//

import getUIData from "../utils/UIProvider";

export const SET_MAIN_PANEL_EDIT_MODE = "SET_MAIN_PANEL_EDIT_MODE";
export const UPDATE_MAIN_LAYOUTS = "UPDATE_MAIN_LAYOUTS";
export const LOADED_UI_DATA = "LOADED_UI_DATA";
export const SET_SHOW_ADD_MAIN_CHART = "SET_SHOW_ADD_MAIN_CHART";
export const SET_OFFERED_CREATOR = "SET_OFFERED_CREATOR";
export const SET_PROFILE_CREATOR_STAGE = "SET_PROFILE_CREATOR_STAGE";
export const SET_SHOW_PROFILE_CREATOR = "SET_SHOW_PROFILE_CREATOR";

/**
 * Profile Creator Stage type
 * @todo description
 */
export const PROFILE_CREATOR_STAGES = {
  ACCOUNT_ADDER: "ACCOUNT_ADDER",
  ADD_BALANCE: "ADD_BALANCE",
  ADD_EXCHANGE: "ADD_EXCHANGE",
  ADD_WALLET: "ADD_WALLET"
};

export function setMainPanelEditMode(isEditMode) {
  return {
    type: SET_MAIN_PANEL_EDIT_MODE,
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
    type: SET_SHOW_ADD_MAIN_CHART,
    payload: showMainChart
  };
}

export function updateMainLayouts(layouts) {
  return {
    type: UPDATE_MAIN_LAYOUTS,
    payload: layouts
  };
}

export function loadedUIData(data) {
  return {
    type: LOADED_UI_DATA,
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
    type: SET_OFFERED_CREATOR,
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
    type: SET_SHOW_PROFILE_CREATOR,
    payload: show
  };
}

export function setProfileCreatorStage(stage) {
  return {
    type: SET_PROFILE_CREATOR_STAGE,
    payload: stage
  };
}
