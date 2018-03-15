//

import getUIData from "../utils/UIProvider";

export const SET_MAIN_PANEL_EDIT_MODE = "SET_MAIN_PANEL_EDIT_MODE";
export const UPDATE_MAIN_LAYOUTS = "UPDATE_MAIN_LAYOUTS";
export const LOADED_UI_DATA = "LOADED_UI_DATA";

export function setMainPanelEditMode(isEditMode) {
  return {
    type: SET_MAIN_PANEL_EDIT_MODE,
    payload: isEditMode
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
