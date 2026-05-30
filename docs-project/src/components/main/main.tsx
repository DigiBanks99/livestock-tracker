import { Component, type ReactNode } from 'react';
import './main.scss';

interface MainProps {
  children: ReactNode;
}

export default class Main extends Component<MainProps> {
  render() {
    const { children } = this.props;

    return (
      <main className='app-main'>
        <div className='main-content'>{children}</div>
      </main>
    );
  }
}
