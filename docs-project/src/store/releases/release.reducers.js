import { ReleaseActionTypes } from './release.actions';

const InitialState = {
  releases: [],
  isFetching: false,
  error: null
};

export function releaseReducer(state = InitialState, action) {
  switch (action.type) {
    case ReleaseActionTypes.RELEASE_FETCH:
      return { ...state, isFetching: true, error: null };
    case ReleaseActionTypes.RELEASE_FETCH_COMPLETED:
      return { ...state, isFetching: false, releases: action.releases };
    case ReleaseActionTypes.RELEASE_FETCH_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
