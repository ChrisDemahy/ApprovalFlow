import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { UserContextProvider } from './components/UserContextProvider';
import logo from './logo.svg';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    </div>
  );
}

export default App;
