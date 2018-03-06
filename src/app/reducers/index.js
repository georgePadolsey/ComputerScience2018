// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import profile from './profile';

const rootReducer = combineReducers({
  profile,
  router,
});

export default rootReducer;
