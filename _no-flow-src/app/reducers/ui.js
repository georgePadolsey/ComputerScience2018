//

import {
  SET_MAIN_PANEL_EDIT_MODE,
  UPDATE_MAIN_LAYOUTS,
  LOADED_UI_DATA,
  SET_SHOW_ADD_MAIN_CHART,
  SET_OFFERED_CREATOR,
  SET_SHOW_PROFILE_CREATOR,
  SET_PROFILE_CREATOR_STAGE,
  PROFILE_CREATOR_STAGES
} from "../actions/ui";

import { setUIData } from "../utils/UIProvider";

const defaultUIState = {
  mainPanelEditMode: false,
  showAddMainChart: false,
  mainPanelLayouts: {},
  firstTime: true,
  offeredCreator: false,
  showProfileCreator: false,
  profileCreatorStage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
};

export default function uiReducer(state = defaultUIState, action) {
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
    case SET_SHOW_ADD_MAIN_CHART:
      ret = Object.assign({}, state, { showAddMainChart: action.payload });
      saveData();
      break;
    case SET_OFFERED_CREATOR:
      ret = Object.assign({}, state, { offeredCreator: action.payload });
      saveData();
      break;
    case SET_SHOW_PROFILE_CREATOR:
      ret = Object.assign({}, state, {
        showProfileCreator: action.payload,
        firstTime: state.firstTime && action.payload
      });
      saveData();
      break;
    case SET_PROFILE_CREATOR_STAGE:
      ret = Object.assign({}, state, { profileCreatorStage: action.payload });
      saveData();
      break;
    default:
      return state;
  }
  return ret;
}
