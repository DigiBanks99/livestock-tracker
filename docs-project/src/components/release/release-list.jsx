import React, { Component } from 'react';
import Release from './release';
import { Platform } from '../platform/platform';

import './release.scss';

export default class ReleaseList extends Component {
  render() {
    const { releases } = this.props;

    const releaseItems = releases.map((release = {}, index) => (
      <Release key={index} release={release} />
    ));

    const platforms = releases.map((release = {}, index) => (
      <Platform key={index} platform={release.platform} />
    ));

    return (
      <div className='release'>
        <ul className='platform-list'>{platforms}</ul>
        <ul className='release-list'>{releaseItems}</ul>
      </div>
    );
  }
}
