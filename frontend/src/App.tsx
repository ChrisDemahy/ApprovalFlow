import React, { useState, useEffect } from 'react';
import LoginContainer from './components/LoginContainer';
import UserProfile from './components/UserProfile';
import MainContainer from './containers/MainContainer';
import ProjectListContainer from './containers/ProjectListContainer';
import UserProfileForm from './Forms/UserProfileForm';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage';
import ProjectForm from './Forms/ProjectForm';
import NewProjectForm from './Forms/NewProjectForm';

interface AppProps {}

const authWrapper = () => {};

function App({}: AppProps) {
  return (
    <Router>
      {!localStorage.token ? (
        <Route path="/login" children={<LoginContainer />} />
      ) : (
        <Route path="/">
          <MainContainer>
            {/* <IndexRoute exact component={AsyncDashboard} /> */}
            <Switch>
              <Route path="/accountForm" children={<UserProfileForm />} />
              <Route path="/account" children={<UserProfile />} />
              <Route
                exact
                path="/projects"
                children={<ProjectListContainer />}
              />
              <Route path="/projects/:id" children={<ProjectPage />} />
              <Route path="/projectForm/:id" children={<ProjectForm />} />
              <Route path="/newProjectForm" children={<NewProjectForm />} />
            </Switch>
          </MainContainer>
        </Route>
      )}
      {/* <LoginContainer /> */}
    </Router>
  );
}

export default App;
