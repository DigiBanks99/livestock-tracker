import { ReleaseService } from '../../services/release.service';
import { ReleaseActions } from './release.actions';

export const ReleaseThunks = {
  fetchReleases: () => async dispatch => {
    dispatch(ReleaseActions.releaseFetch());
    try {
      const service = new ReleaseService();
      const response = await service.get();
      dispatch(ReleaseActions.releaseFetchCompleted(response.data));
    } catch (e) {
      dispatch(ReleaseActions.releaseFetchError(e));
    }
  }
};
