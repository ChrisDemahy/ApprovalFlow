import React, { useState, useEffect } from 'react';
import LoginContainer from './components/LoginContainer';
import UserProfile from './components/UserProfile';
import MainContainer from './containers/MainContainer';
import ProjectListPage from './Pages/ProjectsPage';
import UserProfileForm from './Forms/UserProfileForm';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage';
import ProjectForm from './Forms/ProjectForm';
import NewProjectForm from './Forms/NewProjectForm';
import WorkflowPage from './Pages/WorkflowPage';

import WorkflowList from './components/WorkflowList';
import ApprovalsPage from './Pages/ApprovalsPage';
import OrganizationPage from './Pages/OrganizationPage';
import SignUpContainer from './components/SignUpContainer';
import WorkflowsPage from './Pages/WorkflowsPage';

interface AppProps {}

const authWrapper = () => {};

function App({}: AppProps) {
  return (
    <Router>
      <Switch>
        <Route path="/login" children={<LoginContainer />} />
        <Route path="/signUp" children={<SignUpContainer />} />
        {/* Everything Below this line requires the user to be logged in */}

        <MainContainer>
          <>
            {/* <IndexRoute exact component={AsyncDashboard} /> */}
            <Route path="/accountForm" children={<UserProfileForm />} />
            <Route path="/account" children={<UserProfile />} />

            <Route path="/projects" children={<ProjectListPage />} />
            <Route path="/project/:id" children={<ProjectPage />} />

            <Route path="/workflow/:id" children={<WorkflowPage />} />
            <Route path="/workflows/" children={<WorkflowsPage />} />

            <Route path="/projectForm/:id" children={<ProjectForm />} />
            <Route path="/newProjectForm" children={<NewProjectForm />} />

            <Route path="/approvals" children={<ApprovalsPage />} />

            <Route path="/organization" children={<OrganizationPage />} />
          </>
        </MainContainer>
      </Switch>
      {localStorage.token ? (
        <Redirect exact from="/" to="/projects" />
      ) : (
        <Redirect to="/login" />
      )}
    </Router>
  );
}

export default App;
