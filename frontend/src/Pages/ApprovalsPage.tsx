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

  const { error, data, status, isFetching } = useGetAuthorizations();

  // Helper Methods

  const pendingList = data?.filter(
    (auth: Authorization) => auth.status === 'pending',
  );
  const finishedList = data?.filter(
    (auth: Authorization) => auth.status !== 'pending',
  );
  const panes: panes = [
    {
      menuItem: {
        content: (
          <>
            Active<Label>{pendingList?.length ?? 0}</Label>
          </>
        ),

        key: 'active-approvals',
      },
      render: () => (
        <Tab.Pane>
          {!!pendingList ? (
            <ApprovalList data={pendingList} dispatchMethod={dispatch} />
          ) : (
            <Loader />
          )}
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

        key: 'finished-approvals',
      },
      render: () => (
        <Tab.Pane>
          {!!finishedList ? (
            <ApprovalList data={finishedList} dispatchMethod={dispatch} />
          ) : (
            <Loader />
          )}
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
};

export default ApprovalsPage;
