// @flow
import * as ACTIONS from './types/profileCreator';
import type { ProfileCreatorStage } from './types/profileCreator';

type ProfileCreatorAction = {
  type: $Keys<typeof ACTIONS>
};

export function setOffered(shown: boolean): ProfileCreatorAction {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_OFFERED,
    payload: shown
  };
}

export function show(): ProfileCreatorAction {
  return setShow(true);
}

export function hide(): ProfileCreatorAction {
  return setShow(false);
}

export function setShow(showC: boolean): ProfileCreatorAction {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_SHOW,
    payload: showC
  };
}

export function setStage(stage: ProfileCreatorStage): ProfileCreatorAction {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_STAGE,
    payload: stage
  };
}

export function setCurrentCurrency(currency: string): ProfileCreatorAction {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_CURRENT_EXCHANGE,
    payload: currency
  };
}
export function setCurrentExchange(exchangeId: string): ProfileCreatorAction {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_CURRENT_EXCHANGE,
    payload: exchangeId
  };
}
