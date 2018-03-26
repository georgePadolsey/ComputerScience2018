// @flow
import type { Dispatch } from 'redux';
import uuid from 'uuid/v1';
import type { UIData, MainLayout } from '../_types/UI';

import getUIData from '../utils/UIProvider';

import * as UI_ACTIONS from './types/ui';

type UIAction = {
  type: $Keys<typeof UI_ACTIONS>
};

export function setMainPanelEditMode(isEditMode: boolean): UIAction {
  return {
    type: UI_ACTIONS.SET_MAIN_PANEL_EDIT_MODE,
    payload: isEditMode
  };
}

export function updateMainLayouts(layouts: MainLayout): UIAction {
  return {
    type: UI_ACTIONS.UPDATE_MAIN_LAYOUTS,
    payload: layouts
  };
}

export function loadedUIData(data: ?UIData): UIAction {
  return {
    type: UI_ACTIONS.LOADED_UI_DATA,
    payload: data
  };
}

export function addMainChart(chartName: string, exchangeId: string, symbolId: string) {
  return {
    type: UI_ACTIONS.ADD_MAIN_GRAPH,
    payload: {
      chartName,
      exchangeId,
      symbolId,
      key: uuid()
    }
  };
}

export function loadUIData(): (Dispatch<*>) => Promise<void> {
  return async dispatch => {
    dispatch(loadedUIData(await getUIData()));
  };
}
