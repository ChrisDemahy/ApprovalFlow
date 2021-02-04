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
import { NavLink, Route } from 'react-router-dom';

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
        menuItem: {
          as: NavLink,
          content: (
            <>
              Active<Label>{pendingList.length}</Label>
            </>
          ),
          to: '/approvals',
          exact: true,
          key: 'active-approvals',
        },
        render: () => (
          <Route path="/approvals" exact>
            <Tab.Pane>
              <ApprovalList data={pendingList} dispatchMethod={dispatch} />
            </Tab.Pane>
          </Route>
        ),
      },
      {
        menuItem: {
          as: NavLink,
          content: (
            <>
              Finished<Label>{finishedList.length}</Label>
            </>
          ),
          to: '/approvals/finished',
          exact: true,
          key: 'finished-approvals',
        },
        render: () => (
          <Route path="/approvals/finished" exact>
            <Tab.Pane>
              <ApprovalList data={finishedList} dispatchMethod={dispatch} />
            </Tab.Pane>
          </Route>
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
