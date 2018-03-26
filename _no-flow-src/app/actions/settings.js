//
import * as SETTINGS_ACTIONS from "./types/settings";

export function show() {
  return setShow(true);
}

export function hide() {
  return setShow(false);
}

export function setShow(toShow) {
  return {
    type: SETTINGS_ACTIONS.SETTINGS_SET_SHOW,
    payload: toShow
  };
}
