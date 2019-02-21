import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { releaseReducer } from './releases/release.reducers';

export const reducers = combineReducers({
  releases: releaseReducer
});

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunkMiddleware)
);
