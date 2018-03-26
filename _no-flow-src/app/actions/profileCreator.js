//
import * as ACTIONS from "./types/profileCreator";

export function setOffered(shown) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_OFFERED,
    payload: shown
  };
}

export function show() {
  return setShow(true);
}

export function hide() {
  return setShow(false);
}

export function setShow(showC) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_SHOW,
    payload: showC
  };
}

export function setStage(stage) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_STAGE,
    payload: stage
  };
}

export function setCurrentCurrency(currency) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_CURRENT_CURRENCY,
    payload: currency
  };
}
export function setCurrentExchange(exchangeId) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_CURRENT_EXCHANGE,
    payload: exchangeId
  };
}

export function setBalanceName(name) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_BALANCE_NAME,
    payload: name
  };
}

export function setBalanceAmount(amount) {
  return {
    type: ACTIONS.PROFILE_CREATOR_SET_BALANCE_AMOUNT,
    payload: amount
  };
}
