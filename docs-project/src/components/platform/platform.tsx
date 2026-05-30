import { Component } from 'react';

interface PlatformProps {
  platform: string;
}

export class Platform extends Component<PlatformProps> {
  render() {
    const { platform = 'win' } = this.props;

    return <li className='platform-item'>{platform}</li>;
  }
}
