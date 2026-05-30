import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import { thunk as thunkMiddleware } from 'redux-thunk';
import type { ReleaseAction } from './releases/release.actions';
import { releaseReducer } from './releases/release.reducers';

export const reducers = combineReducers({
  releases: releaseReducer
});

export type RootState = ReturnType<typeof reducers>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ReleaseAction
>;

export const store = createStore(reducers, undefined, applyMiddleware(thunkMiddleware));

export type AppDispatch = typeof store.dispatch;
