//      
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { ipc } from '../reducers/ipc';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, ipc);

function configureStore(initialState                   ) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };