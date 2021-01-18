import React, { useState, useEffect } from 'react';
import Login from './components/LoginContainer';

import logo from './logo.svg';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
