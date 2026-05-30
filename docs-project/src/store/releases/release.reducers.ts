import type { Release } from '../../models/release';
import { ReleaseActionTypes, type ReleaseAction } from './release.actions';

export interface ReleaseState {
  releases: Release[];
  isFetching: boolean;
  error: string | null;
}

const initialState: ReleaseState = {
  releases: [],
  isFetching: false,
  error: null
};

export function releaseReducer(
  state: ReleaseState = initialState,
  action: ReleaseAction
): ReleaseState {
  switch (action.type) {
    case ReleaseActionTypes.RELEASE_FETCH:
      return { ...state, isFetching: true, error: null };
    case ReleaseActionTypes.RELEASE_FETCH_COMPLETED:
      return { ...state, isFetching: false, releases: action.releases, error: null };
    case ReleaseActionTypes.RELEASE_FETCH_ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
