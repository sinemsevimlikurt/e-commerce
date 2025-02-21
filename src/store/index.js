import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
