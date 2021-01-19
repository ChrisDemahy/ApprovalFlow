import React, { useState, useEffect } from 'react';
import LoginContainer from './components/LoginContainer';

import logo from './logo.svg';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <LoginContainer />
    </div>
  );
}

export default App;
