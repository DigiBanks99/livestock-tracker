export const ReleaseActionTypes = {
  RELEASE_FETCH: 'RELEASE_FETCH',
  RELEASE_FETCH_COMPLETED: 'RELEASE_FETCH_COMPLETED',
  RELEASE_FETCH_ERROR: 'RELEASE_FETCH_ERROR'
};

export const ReleaseActions = {
  releaseFetch: () => {
    return {
      type: ReleaseActionTypes.RELEASE_FETCH
    };
  },
  releaseFetchCompleted: releases => {
    return {
      type: ReleaseActionTypes.RELEASE_FETCH_COMPLETED,
      releases
    };
  },
  releaseFetchError: error => {
    return {
      type: ReleaseActionTypes.RELEASE_FETCH_ERROR,
      error
    };
  }
};
