import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { HeaderContainer } from './header/header.container';
import { HomeContainer } from './home/home.container';
import Main from './main/main';

import './app.scss';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <HeaderContainer />
        <Main>
          <Switch>
            <Redirect exact from='/' to='/home' />
            <Route exact path='/home' component={HomeContainer} />
          </Switch>
        </Main>
      </div>
    );
  }
}

export default App;
