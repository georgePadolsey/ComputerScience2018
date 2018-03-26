// @flow
import * as SETTINGS_ACTIONS from './types/settings';

type SettingsAction = {
  type: $Keys<typeof SETTINGS_ACTIONS>
};

export function show(): SettingsAction {
  return setShow(true);
}

export function hide(): SettingsAction {
  return setShow(false);
}

export function setShow(toShow: boolean): SettingsAction {
  return {
    type: SETTINGS_ACTIONS.SETTINGS_SET_SHOW,
    payload: toShow
  };
}
