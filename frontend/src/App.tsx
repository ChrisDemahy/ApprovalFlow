import React, { useState, useEffect } from 'react';
import LoginContainer from './components/LoginContainer';
import UserProfile from './components/UserProfile';
import MainContainer from './containers/MainContainer';
import UserProfileForm from './Forms/UserProfileForm';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <Route path="/">
        <MainContainer>
          {/* <IndexRoute exact component={AsyncDashboard} /> */}
          <Switch>
            <Route path="/accountForm" children={<UserProfileForm />} />
            <Route path="/account" children={<UserProfile />} />
          </Switch>
        </MainContainer>
      </Route>
      {/* <LoginContainer /> */}
    </Router>
  );
}

export default App;
