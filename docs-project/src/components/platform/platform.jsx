import React, { Component } from 'react';

export class Platform extends Component {
  render() {
    const { platform = 'win' } = this.props;
    return <li className='platform-item'>{platform}</li>;
  }
}
