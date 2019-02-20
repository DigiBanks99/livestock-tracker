import React, { Component } from 'react';
import './App.css';
import { HeaderContainer } from './header/header.container';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <HeaderContainer />
      </div>
    );
  }
}

export default App;
