import React, { useState, useEffect } from 'react';
import LoginContainer from './components/LoginContainer';
import UserProfile from './components/UserProfile';
import UserProfileForm from './components/UserProfileForm';
import logo from './logo.svg';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <UserProfile />
      {/* <LoginContainer />  */}
      <UserProfileForm />
    </div>
  );
}

export default App;
