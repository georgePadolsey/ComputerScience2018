// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import profile from './profile';
import ui from './ui';

const rootReducer = combineReducers({
  profileData: profile,
  router,
  uiData: ui
});

export default rootReducer;
