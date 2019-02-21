import React, { Component } from 'react';

export default class Release extends Component {
  render() {
    const { release } = this.props;
    return <li>{release.version}</li>;
  }
}
