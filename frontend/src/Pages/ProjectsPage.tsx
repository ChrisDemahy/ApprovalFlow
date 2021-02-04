import React, { useEffect, useState } from 'react';

import {
  Button,
  Divider,
  Header,
  Icon,
  Label,
  Loader,
  Menu,
  Tab,
} from 'semantic-ui-react';

import type Project from '../types/project';

import ProjectList from '../components/ProjectList';
import TabContainer, { panes } from '../containers/TabContainer';
import NewProjectForm from '../Forms/NewProjectForm';
import { useGetProjects } from '../shared/api';
import { Link, Redirect, Route, useRouteMatch } from 'react-router-dom';

const ProjectsPage = () => {
  // React Router
  let { url, path } = useRouteMatch();

  // Projects are returned under and array
  type projectData = Project[];

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useGetProjects();
  if (data && typeof data === typeof Array) {
    const pendingList = data.filter(
      (project) =>
        project.status === 'pending_approval' || project.status === 'created',
    );
    const finishedList = data.filter(
      (project) =>
        project.status !== 'pending_approval' && project.status !== 'created',
    );
    const panes: panes = [
      {
        menuItem: (
          <Menu.Item as={Link} to={`${path}/active/`} key="active">
            Active<Label>{pendingList.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Route} path={`${path}/active/`}>
            <ProjectList data={pendingList} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item as={Link} to={`${path}/finished`} key="finished">
            Finished<Label>{finishedList.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Route} path={`${path}/finished`}>
            <ProjectList data={finishedList} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item as={Link} to={`${path}/new`} key="new">
            New Project
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Route} path={`${path}/new`}>
            <NewProjectForm />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <>
        {/* Tabs */}
        <TabContainer
          panes={panes}
          head={{
            content: `Projects`,
            subHeader1: 'See outstanding projects',
          }}
        />
        {/* Redirect to defualt route */}
        <Redirect from="/projects" to="/projects/active" />
      </>
    );
  } else {
    return <Loader />;
  }
};

export default ProjectsPage;
