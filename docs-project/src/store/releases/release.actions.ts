import type { Release } from '../../models/release';

export const ReleaseActionTypes = {
  RELEASE_FETCH: 'RELEASE_FETCH',
  RELEASE_FETCH_COMPLETED: 'RELEASE_FETCH_COMPLETED',
  RELEASE_FETCH_ERROR: 'RELEASE_FETCH_ERROR'
} as const;

export interface ReleaseFetchAction {
  type: typeof ReleaseActionTypes.RELEASE_FETCH;
}

export interface ReleaseFetchCompletedAction {
  type: typeof ReleaseActionTypes.RELEASE_FETCH_COMPLETED;
  releases: Release[];
}

export interface ReleaseFetchErrorAction {
  type: typeof ReleaseActionTypes.RELEASE_FETCH_ERROR;
  error: string;
}

export type ReleaseAction =
  | ReleaseFetchAction
  | ReleaseFetchCompletedAction
  | ReleaseFetchErrorAction;

export const ReleaseActions = {
  releaseFetch: (): ReleaseFetchAction => ({
    type: ReleaseActionTypes.RELEASE_FETCH
  }),
  releaseFetchCompleted: (releases: Release[]): ReleaseFetchCompletedAction => ({
    type: ReleaseActionTypes.RELEASE_FETCH_COMPLETED,
    releases
  }),
  releaseFetchError: (error: string): ReleaseFetchErrorAction => ({
    type: ReleaseActionTypes.RELEASE_FETCH_ERROR,
    error
  })
};
