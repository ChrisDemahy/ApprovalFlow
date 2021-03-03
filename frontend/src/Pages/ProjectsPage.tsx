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

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const queryInfo = useGetProjects();
  const { error, data, status, isFetching } = queryInfo;
  if (!data) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: {
          content: 'Active',
          key: 'active-projects',
        },
        render: () => (
          <Tab.Pane>
            <ProjectList
              data={data.filter(
                (project) =>
                  project.status === 'pending_approval' ||
                  project.status === 'created',
              )}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          content: 'Finished',

          key: 'finished-projects',
        },

        render: () => (
          <Tab.Pane>
            <ProjectList
              data={data.filter(
                (project) =>
                  project.status !== 'pending_approval' &&
                  project.status !== 'created',
              )}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          content: 'New Project',
          key: 'new-projects',
        },

        render: () => (
          <Tab.Pane>
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
            subHeader1: 'See all projects in your organization',
          }}
        />
      </>
    );
  }
};

export default ProjectsPage;
