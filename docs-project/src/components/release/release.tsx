import { Component } from 'react';
import type { Release as ReleaseModel } from '../../models/release';

interface ReleaseProps {
  release: ReleaseModel;
}

export default class Release extends Component<ReleaseProps> {
  render() {
    const { release } = this.props;

    return <li>{release.version}</li>;
  }
}
