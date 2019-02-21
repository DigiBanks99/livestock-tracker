import React, { Component } from 'react';

import logo from '../../logo.svg';
import Title from './title';

export class Header extends Component {
  render() {
    return (
      <header className='app-header'>
        <img src={logo} className='app-logo' alt='logo' />
        <Title />
      </header>
    );
  }
}
