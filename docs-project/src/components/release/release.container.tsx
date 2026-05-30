import { connect, type ConnectedProps } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { ReleaseThunks } from '../../store/releases/release.thunks';
import ReleaseList from './release-list';

const mapStateToProps = (state: RootState) => ({
  releases: state.releases.releases
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  void dispatch(ReleaseThunks.fetchReleases());
  return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReleaseContainerProps = ConnectedProps<typeof connector>;

export const ReleaseContainer = connector(ReleaseList);
