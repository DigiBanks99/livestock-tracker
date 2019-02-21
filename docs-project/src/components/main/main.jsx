import React, { Component } from 'react';

import './main.scss';

export default class Main extends Component {
  render() {
    const { children } = this.props;
    return (
      <main className='app-main'>
        <div className='main-content'>{children}</div>
      </main>
    );
  }
}
