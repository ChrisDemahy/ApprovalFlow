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
import {
  Link,
  Redirect,
  Route,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

const ProjectsPage = () => {
  // React Router

  // Ensures that if the user loads up the details it resets to the main tab
  // TODO Make it so when a user navigates to /projects/details it renders correctly
  const history = useHistory();
  useEffect(() => {
    history.push('/projects');
  }, []);

  let index: number = 0;

  // Projects are returned under and array
  type projectData = Project[];

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const queryInfo = useGetProjects();
  const { error, data, status, isFetching } = queryInfo;

  const panes: panes = [
    {
      menuItem: {
        as: Link,
        content: 'Active',
        to: '/projects',
        exact: true,
        key: 'active-projects',
      },
      render: () => (
        <Route path="/projects" exact key="active-projects-pane">
          <Tab.Pane>
            {data !== undefined ? (
              <ProjectList
                data={data.filter(
                  (project) =>
                    project.status === 'pending_approval' ||
                    project.status === 'created',
                )}
              />
            ) : (
              <Loader />
            )}
          </Tab.Pane>
        </Route>
      ),
    },
    {
      menuItem: {
        as: Link,
        content: 'Finished',
        to: '/projects/finished',
        exact: true,
        key: 'finished-projects',
      },

      render: () => (
        <Route path="/projects/finished" exact key="finished-projects-pane">
          <Tab.Pane>
            {data !== undefined ? (
              <ProjectList
                data={data.filter(
                  (project) =>
                    project.status !== 'pending_approval' &&
                    project.status !== 'created',
                )}
              />
            ) : (
              <Loader />
            )}
          </Tab.Pane>
        </Route>
      ),
    },
    {
      menuItem: {
        as: Link,
        content: 'New Project',
        to: '/projects/new',
        exact: true,
        key: 'new-projects',
      },

      render: () => (
        <Route path="/projects/new" exact key="new-projects-pane">
          <Tab.Pane>
            <NewProjectForm />
          </Tab.Pane>
        </Route>
      ),
    },
  ];
  return (
    <>
      {/* Tabs */}

      <TabContainer
        panes={panes}
        activeIndex={index}
        head={{
          content: `Projects`,
          subHeader1: 'See outstanding projects',
        }}
      />
    </>
  );
};

export default ProjectsPage;
