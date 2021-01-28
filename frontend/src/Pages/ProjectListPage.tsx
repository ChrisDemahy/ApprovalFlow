import React, { useEffect, useState } from 'react';
import CardList, { itemArray } from '../components/CardList';
import { getAllProjects } from '../shared/api';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';
import { Link } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faLock } from '@fortawesome/free-solid-svg-icons';

import type Project from '../types/project';
import ApprovalList from '../components/ApprovalList';
import ProjectList from '../components/ProjectList';
import TabContainer, { panes } from '../containers/TabContainer';

const ProjectListPage = () => {
  // React Query

  // Projects are returned under and array
  type projectData = Project[];

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<projectData, Error>(
    'projects',
    getAllProjects,
  );

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
