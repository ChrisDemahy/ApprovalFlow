import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import StateProvider from './components/StateProvider';
import logo from './logo.svg';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <StateProvider>
        <Login />
      </StateProvider>
    </div>
  );
}

export default App;
