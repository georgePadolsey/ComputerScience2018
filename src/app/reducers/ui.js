// @flow
import type { actionType } from "../_types/ActionType";
import {
  SET_MAIN_PANEL_EDIT_MODE,
  UPDATE_MAIN_LAYOUTS,
  LOADED_UI_DATA
} from "../actions/ui";
import { setUIData } from "../utils/UIProvider";

const defaultUIState = {
  mainPanelEditMode: false,
  mainPanelLayouts: {}
};

export default function uiReducer(state = defaultUIState, action: actionType) {
  let ret = state;
  const saveData = () => {
    setUIData(ret);
  };

  switch (action.type) {
    case SET_MAIN_PANEL_EDIT_MODE:
      ret = Object.assign({}, state, { mainPanelEditMode: action.payload });
      saveData();
      break;
    case UPDATE_MAIN_LAYOUTS:
      ret = Object.assign({}, state, { mainPanelLayouts: action.payload });
      saveData();
      break;
    case LOADED_UI_DATA:
      ret = Object.assign({}, state, action.payload);
      saveData();
      break;
    default:
      return state;
  }
  return ret;
}
