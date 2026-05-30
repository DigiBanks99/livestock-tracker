import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HeaderContainer } from './header/header.container';
import { HomeContainer } from './home/home.container';
import Main from './main/main';

import './app.scss';

function App() {
  return (
    <div className='app'>
      <HeaderContainer />
      <Main>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<HomeContainer />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
