import React, { useState, useEffect } from 'react';
import LoginContainer from './components/LoginContainer';
import UserProfile from './components/UserProfile';
import MainContainer from './containers/MainContainer';
import ProjectListPage from './Pages/ProjectListPage';
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

interface AppProps {}

const authWrapper = () => {};

function App({}: AppProps) {
  return (
    <Router>
      <Switch>
        <Route path="/login" children={<LoginContainer />} />
        <Route path="/signUp" children={<SignUpContainer />} />
        {/* Everything Below this line requires the user to be logged in */}
        {!localStorage.token && <Redirect to="/login" />}

        <MainContainer>
          <>
            {/* <IndexRoute exact component={AsyncDashboard} /> */}
            <Route path="/accountForm" children={<UserProfileForm />} />
            <Route path="/account" children={<UserProfile />} />
            <Route path="/projectForm" children={<NewProjectForm />} />

            <Route exact path="/projects" children={<ProjectListPage />} />
            <Route exact path="/projects/:id" children={<ProjectPage />} />
            <Route
              exact
              path="/workflow_runs/:id"
              children={<WorkflowPage />}
            />
            <Route exact path="/workflow_runs/" children={<WorkflowList />} />
            <Route path="/projectForm/:id" children={<ProjectForm />} />
            <Route path="/newProjectForm" children={<NewProjectForm />} />
            <Route path="/approvals" children={<ApprovalsPage />} />
            <Route path="/organization" children={<OrganizationPage />} />
          </>
        </MainContainer>
      </Switch>

      {/* <LoginContainer /> */}
    </Router>
  );
}

export default App;
