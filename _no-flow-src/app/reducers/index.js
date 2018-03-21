//
import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import profile from "./profile";
import ui from "./ui";
import crypto from "./crypto";

const rootReducer = combineReducers({
  profileData: profile,
  router,
  uiData: ui,
  cryptoData: crypto
});

export default rootReducer;
