//
import merge from "lodash/merge";

import {
  PROFILE_CREATOR_SET_OFFERED,
  PROFILE_CREATOR_SET_SHOW,
  PROFILE_CREATOR_SET_STAGE,
  PROFILE_CREATOR_SET_CURRENT_CURRENCY,
  PROFILE_CREATOR_SET_CURRENT_EXCHANGE,
  PROFILE_CREATOR_STAGES
} from "../../actions/types/profileCreator";

const defaultProfileCreatorState = {
  show: true,
  firstTime: true,
  offered: false,
  stage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
};

export default function profileCreatorReducer(
  state = defaultProfileCreatorState,
  action
) {
  switch (action.type) {
    case PROFILE_CREATOR_SET_OFFERED:
      state = merge({}, state, { offered: action.payload });

      break;
    case PROFILE_CREATOR_SET_SHOW:
      state = merge({}, state, {
        show: action.payload,
        firstTime: state.firstTime && action.payload
      });

      break;
    case PROFILE_CREATOR_SET_STAGE:
      state = merge({}, state, { stage: action.payload });

      break;
    case PROFILE_CREATOR_SET_CURRENT_CURRENCY:
      state = merge({}, state, { currencySelected: action.payload });

      break;
    case PROFILE_CREATOR_SET_CURRENT_EXCHANGE:
      state = merge({}, state, { exchangeSelected: action.payload });
      break;
    default:
      break;
  }
  return state;
}
