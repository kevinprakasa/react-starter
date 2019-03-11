import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createRootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.REDUX_DEVTOOLS_EXTENSION

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers
)

export default store;