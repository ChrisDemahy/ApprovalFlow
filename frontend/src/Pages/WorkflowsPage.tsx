import React, { useContext, useState } from 'react';
import {
  Loader,
  List,
  Image,
  Table,
  Header,
  Button,
  Tab,
  Menu,
  Label,
} from 'semantic-ui-react';

import { useQuery, useQueryClient } from 'react-query';
import type User from '../types/user';

import { useGetAuthorizations, useGetWorkflowRuns } from '../shared/api';

import type Workflowrun from '../types/workflowrun';

import type Authorization from '../types/authorization';
import { ModalContext } from '../components/ApprovalModal';
import ApprovalList from '../components/ApprovalList';
import TabContainer, { panes } from '../containers/TabContainer';
import { NavLink, Route } from 'react-router-dom';
import WorkflowList from '../components/WorkflowList';

const WorkflowsPage = () => {
  const { state, dispatch } = useContext(ModalContext);

  const queryClient = useQueryClient();

  type WorkflowRuns = Workflowrun[];
  type Authorizations = Authorization[];
  const { error, data, status, isFetching } = useGetWorkflowRuns();

  // Helper Methods

  const pendingList = data?.filter((workflow) =>
    workflow.status.includes('pending'),
  );
  const finishedList = data?.filter(
    (workflow) => workflow.status.includes('pending') !== true,
  );
  const panes: panes = [
    {
      menuItem: {
        as: NavLink,
        content: (
          <>
            Active<Label>{pendingList?.length ?? 0}</Label>
          </>
        ),
        to: '/workflows',
        exact: true,
        key: 'active-workflows',
      },
      render: () => (
        <Route path="/workflows" exact>
          <Tab.Pane>
            {!!pendingList ? <WorkflowList data={pendingList} /> : <Loader />}
          </Tab.Pane>
        </Route>
      ),
    },
    {
      menuItem: {
        as: NavLink,
        content: (
          <>
            Finished<Label>{finishedList?.length ?? 0}</Label>
          </>
        ),
        to: '/workflows/finished',
        exact: true,
        key: 'finished-workflows',
      },
      render: () => (
        <Route path="/workflows/finished" exact>
          <Tab.Pane>
            {!!finishedList ? <WorkflowList data={finishedList} /> : <Loader />}
          </Tab.Pane>
        </Route>
      ),
    },
  ];
  return (
    <TabContainer
      panes={panes}
      head={{
        content: `Workflows`,
        subHeader1:
          'See all the workflows that are currently active in your organization',
      }}
    />
  );
};

export default WorkflowsPage;
