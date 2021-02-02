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

const ProjectListPage = () => {
  // React Query

  // Projects are returned under and array
  type projectData = Project[];

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useGetProjects();
  if (!data) {
    return <Loader />;
  } else {
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
          <Menu.Item key="active">
            Active<Label>{pendingList.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <ProjectList data={pendingList} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="finished">
            Finished<Label>{finishedList.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <ProjectList data={finishedList} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="new">New Project</Menu.Item>,
        render: () => (
          <Tab.Pane>
            <NewProjectForm />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <TabContainer
        panes={panes}
        head={{
          content: `Projects`,
          subHeader1: 'See outstanding projects',
        }}
      />
    );
  }
};

export default ProjectListPage;
