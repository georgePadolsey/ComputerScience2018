//

import {
  SET_MAIN_PANEL_EDIT_MODE,
  UPDATE_MAIN_LAYOUTS,
  LOADED_UI_DATA,
  SET_SHOW_ADD_MAIN_CHART,
  SET_OFFERED_CREATOR,
  SET_SHOW_PROFILE_CREATOR,
  SET_PROFILE_CREATOR_STAGE,
  SET_PROFILE_CREATOR_CURRENT_CURRENCY,
  SET_PROFILE_CREATOR_CURRENT_EXCHANGE,
  PROFILE_CREATOR_STAGES
} from "../actions/types/ui";

import { setUIData } from "../utils/UIProvider";

const defaultUIState = {
  mainPanelEditMode: false,
  showAddMainChart: false,
  mainPanelLayouts: {},
  offeredCreator: false,
  profileCreatorState: {
    show: true,
    firstTime: true,
    stage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
  }
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
        profileCreatorState: {
          showProfileCreator: action.payload,
          firstTime: state.firstTime && action.payload
        }
      });
      saveData();
      break;
    case SET_PROFILE_CREATOR_STAGE:
      ret = Object.assign({}, state, {
        profileCreatorState: { stage: action.payload }
      });
      saveData();
      break;
    case SET_PROFILE_CREATOR_CURRENT_CURRENCY:
      ret = Object.assign({}, state, {
        profileCreatorState: { currencySelected: action.payload }
      });
      saveData();
      break;
    case SET_PROFILE_CREATOR_CURRENT_EXCHANGE:
      ret = Object.assign({}, state, {
        profileCreatorState: { exchangeSelected: action.payload }
      });
      saveData();
      break;
    default:
      return state;
  }
  return ret;
}
