// @flow
import type { actionType } from '../_types/ActionType';
import type { UIData, ProfileCreatorStage } from '../_types/UI';
import getUIData from '../utils/UIProvider';

export const SET_MAIN_PANEL_EDIT_MODE = 'SET_MAIN_PANEL_EDIT_MODE';
export const UPDATE_MAIN_LAYOUTS = 'UPDATE_MAIN_LAYOUTS';
export const LOADED_UI_DATA = 'LOADED_UI_DATA';
export const SET_SHOW_ADD_MAIN_CHART = 'SET_SHOW_ADD_MAIN_CHART';
export const SET_OFFERED_CREATOR = 'SET_OFFERED_CREATOR';
export const SET_PROFILE_CREATOR_STAGE = 'SET_PROFILE_CREATOR_STAGE';
export const SET_SHOW_PROFILE_CREATOR = 'SET_SHOW_PROFILE_CREATOR';

/**
 * Profile Creator Stage type
 * @todo description
 */
export const PROFILE_CREATOR_STAGES = {
  ACCOUNT_ADDER: 'ACCOUNT_ADDER',
  ADD_BALANCE: 'ADD_BALANCE',
  ADD_EXCHANGE: 'ADD_EXCHANGE',
  ADD_WALLET: 'ADD_WALLET'
};

export function setMainPanelEditMode(isEditMode: boolean): actionType {
  return {
    type: SET_MAIN_PANEL_EDIT_MODE,
    payload: isEditMode
  };
}

export function showAddMainChart(): actionType {
  return setShowAddMainChart(true);
}

export function hideAddMainChart(): actionType {
  return setShowAddMainChart(false);
}

export function setShowAddMainChart(showMainChart: boolean): actionType {
  return {
    type: SET_SHOW_ADD_MAIN_CHART,
    payload: showMainChart
  };
}

export function updateMainLayouts(layouts: MainLayout): actionType {
  return {
    type: UPDATE_MAIN_LAYOUTS,
    payload: layouts
  };
}

export function loadedUIData(data: UIData): actionType {
  return {
    type: LOADED_UI_DATA,
    payload: data
  };
}

export function loadUIData(): ((actionType) => mixed) => Promise<void> {
  return async (dispatch: actionType => mixed) => {
    dispatch(loadedUIData(await getUIData()));
  };
}

export function setOfferedCreator(shown: boolean): actionType {
  return {
    type: SET_OFFERED_CREATOR,
    payload: shown
  };
}

export function showProfileCreator(): actionType {
  return setShowProfileCreator(true);
}

export function hideProfileCreator(): actionType {
  return setShowProfileCreator(false);
}

export function setShowProfileCreator(show: boolean): actionType {
  return {
    type: SET_SHOW_PROFILE_CREATOR,
    payload: show
  };
}

export function setProfileCreatorStage(stage: ProfileCreatorStage): actionType {
  return {
    type: SET_PROFILE_CREATOR_STAGE,
    payload: stage
  };
}
