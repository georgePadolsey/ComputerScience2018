// @flow
/* eslint no-param-reassign:0 */
import merge from 'lodash/merge';

import {
  PROFILE_CREATOR_SET_OFFERED,
  PROFILE_CREATOR_SET_SHOW,
  PROFILE_CREATOR_SET_STAGE,
  PROFILE_CREATOR_SET_CURRENT_CURRENCY,
  PROFILE_CREATOR_SET_CURRENT_EXCHANGE,
  PROFILE_CREATOR_STAGES,
  PROFILE_CREATOR_SET_BALANCE_AMOUNT,
  PROFILE_CREATOR_SET_BALANCE_NAME
} from '../../actions/types/profileCreator';
import type { actionType } from '../../_types/ActionType';
import type { ProfileCreatorState } from '../../_types/UI';

const defaultProfileCreatorState: ProfileCreatorState = {
  show: true,
  firstTime: true,
  stage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER
};

export default function profileCreatorReducer(
  state: ?ProfileCreatorState = defaultProfileCreatorState,
  action: actionType
) {
  switch (action.type) {
    case PROFILE_CREATOR_SET_OFFERED:
      return merge({}, state, { offered: action.payload });
    case PROFILE_CREATOR_SET_SHOW:
      return merge({}, state, {
        show: action.payload,
        stage: PROFILE_CREATOR_STAGES.ACCOUNT_ADDER,
        firstTime: state.firstTime && action.payload
      });

    case PROFILE_CREATOR_SET_STAGE:
      return merge({}, state, { stage: action.payload });

    case PROFILE_CREATOR_SET_CURRENT_CURRENCY:
      return merge({}, state, { currencySelected: action.payload });

    case PROFILE_CREATOR_SET_CURRENT_EXCHANGE:
      return merge({}, state, { exchangeSelected: action.payload });

    case PROFILE_CREATOR_SET_BALANCE_NAME:
      return merge({}, state, { balanceName: action.payload });

    case PROFILE_CREATOR_SET_BALANCE_AMOUNT:
      return merge({}, state, { balanceAmount: action.payload });
    default:
      return state;
  }
}
