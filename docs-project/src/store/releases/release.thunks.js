import ReleaseService from '../services/release';
import { ReleaseActions } from './release.actions';

export const ReleaseThunks = {
  fetchReleases: () => async (dispatch, getState) => {
    dispatch(ReleaseActions.releaseFetch());
    try {
      var response = await ReleaseService.get();
      dispatch(ReleaseActions.releaseFetchCompleted(response.data));
    } catch (e) {
      dispatch(ReleaseActions.releaseFetchError(e));
    }
  }
};
