import { ReleaseService } from '../../services/release.service';
import type { AppThunk } from '../store';
import { ReleaseActions } from './release.actions';

export const ReleaseThunks = {
  fetchReleases: (): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(ReleaseActions.releaseFetch());

    try {
      const service = new ReleaseService();
      const releases = await service.get();
      dispatch(ReleaseActions.releaseFetchCompleted(releases));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch releases';
      dispatch(ReleaseActions.releaseFetchError(message));
    }
  }
};
