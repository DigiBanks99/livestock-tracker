import React, { Component } from 'react';
import './home.scss';
import HomeWelcome from './home-welcome';
import HomeInformation from './home-information';
import { ReleaseContainer } from '../release/release.container';

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <HomeWelcome />
        <HomeInformation />
        <ReleaseContainer />
      </div>
    );
  }
}
