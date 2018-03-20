// @flow
import type { actionType } from "../_types/ActionType";
import type { UIData, ProfileCreatorStage, MainLayout } from "../_types/UI";
import getUIData from "../utils/UIProvider";
import type { Dispatch } from "redux";
import * as UI_ACTIONS from "./types/ui";

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

type UIAction = {
  +type: $Keys<typeof UI_ACTIONS>
};

export function setMainPanelEditMode(isEditMode: boolean): UIAction {
  return {
    type: UI_ACTIONS.SET_MAIN_PANEL_EDIT_MODE,
    payload: isEditMode
  };
}

export function showAddMainChart(): UIAction {
  return setShowAddMainChart(true);
}

export function hideAddMainChart(): UIAction {
  return setShowAddMainChart(false);
}

export function setShowAddMainChart(showMainChart: boolean): UIAction {
  return {
    type: UI_ACTIONS.SET_SHOW_ADD_MAIN_CHART,
    payload: showMainChart
  };
}

export function updateMainLayouts(layouts: MainLayout): UIAction {
  return {
    type: UI_ACTIONS.UPDATE_MAIN_LAYOUTS,
    payload: layouts
  };
}

export function loadedUIData(data: UIData): UIAction {
  return {
    type: UI_ACTIONS.LOADED_UI_DATA,
    payload: data
  };
}

export function loadUIData(): (Dispatch<*>) => Promise<void> {
  return async dispatch => {
    var UIData = await getUIData();
    var t = loadedUIData(UIData);
    dispatch(t);
  };
}

export function setOfferedCreator(shown: boolean): UIAction {
  return {
    type: UI_ACTIONS.SET_OFFERED_CREATOR,
    payload: shown
  };
}

export function showProfileCreator(): UIAction {
  return setShowProfileCreator(true);
}

export function hideProfileCreator(): UIAction {
  return setShowProfileCreator(false);
}

export function setShowProfileCreator(show: boolean): UIAction {
  return {
    type: UI_ACTIONS.SET_SHOW_PROFILE_CREATOR,
    payload: show
  };
}

export function setProfileCreatorStage(stage: ProfileCreatorStage): UIAction {
  return {
    type: UI_ACTIONS.SET_PROFILE_CREATOR_STAGE,
    payload: stage
  };
}
