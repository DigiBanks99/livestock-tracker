import { connect } from 'react-redux';
import { ReleaseThunks } from '../../store/releases/release.thunks';
import ReleaseList from './release-list';

const mapStateToProps = state => ({
  releases: state.releases.releases
});

const mapDispatchToProps = dispatch => ({
  fetchReleases: dispatch(ReleaseThunks.fetchReleases())
});

export const ReleaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseList);
