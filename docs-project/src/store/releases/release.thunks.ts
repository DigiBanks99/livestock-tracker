import type { AxiosError } from 'axios';
import { ReleaseService } from '../../services/release.service';
import type { AppThunk } from '../store';
import { ReleaseActions } from './release.actions';

export const ReleaseThunks = {
  fetchReleases: (): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(ReleaseActions.releaseFetch());

    try {
      const service = new ReleaseService();
      const response = await service.get();
      dispatch(ReleaseActions.releaseFetchCompleted(response.data));
    } catch (error) {
      const axiosError = error as AxiosError;
      dispatch(
        ReleaseActions.releaseFetchError(axiosError.message ?? 'Failed to fetch releases')
      );
    }
  }
};
