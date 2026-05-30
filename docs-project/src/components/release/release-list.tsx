import { Component } from 'react';
import { Platform } from '../platform/platform';
import type { Release } from '../../models/release';
import ReleaseItem from './release';
import './release.scss';

export interface ReleaseListProps {
  releases: Release[];
}

export default class ReleaseList extends Component<ReleaseListProps> {
  render() {
    const { releases } = this.props;

    const releaseItems = releases.map((release) => (
      <ReleaseItem key={`${release.platform}-${release.version}`} release={release} />
    ));

    const platforms = releases.map((release) => (
      <Platform key={`${release.platform}-${release.version}`} platform={release.platform} />
    ));

    return (
      <div className='release'>
        <ul className='platform-list'>{platforms}</ul>
        <ul className='release-list'>{releaseItems}</ul>
      </div>
    );
  }
}
