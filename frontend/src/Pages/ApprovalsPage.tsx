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

import { useGetAuthorizations } from '../shared/api';

import type Workflowrun from '../types/workflowrun';

import type Authorization from '../types/authorization';
import { ModalContext } from '../components/ApprovalModal';
import ApprovalList from '../components/ApprovalList';
import TabContainer, { panes } from '../containers/TabContainer';

const ApprovalsPage = () => {
  const { state, dispatch } = useContext(ModalContext);

  const queryClient = useQueryClient();
  const id = '5';
  type WorkflowRuns = Workflowrun[];
  type Authorizations = Authorization[];
  const { error, data, status, isFetching } = useGetAuthorizations();

  // Helper Methods

  if (!!data) {
    const pendingList = data.filter(
      (auth: Authorization) => auth.status === 'pending',
    );
    const finishedList = data.filter(
      (auth: Authorization) => auth.status !== 'pending',
    );
    const panes: panes = [
      {
        menuItem: (
          <Menu.Item key="active">
            Active<Label>{data.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <ApprovalList data={pendingList} dispatchMethod={dispatch} />
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
            <ApprovalList data={finishedList} dispatchMethod={dispatch} />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <TabContainer
        panes={panes}
        head={{
          content: `Approvals`,
          subHeader1:
            'See workflows that need your approval as well as workflows you have approved in the past',
        }}
      />
    );
  } else {
    return <Loader />;
  }
};

export default ApprovalsPage;
