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

  if (!data) {
    return <Loader />;
  } else {
    const pendingList = data.filter((workflow) =>
      workflow.status.includes('pending'),
    );
    const finishedList = data.filter(
      (workflow) => workflow.status.includes('pending') !== true,
    );
    const panes: panes = [
      {
        menuItem: {
          content: (
            <>
              Active<Label>{pendingList.length}</Label>
            </>
          ),
          key: 'active-workflows',
        },
        render: () => (
          <Tab.Pane>
            <WorkflowList data={pendingList} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          content: (
            <>
              Finished<Label>{finishedList?.length ?? 0}</Label>
            </>
          ),
          key: 'finished-workflows',
        },
        render: () => (
          <Tab.Pane>
            <WorkflowList data={finishedList} />
          </Tab.Pane>
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
  }
};

export default WorkflowsPage;
