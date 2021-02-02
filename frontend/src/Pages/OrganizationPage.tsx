import React, { useEffect, useState } from 'react';
import CardList, { itemArray } from '../components/CardList';

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

import TabContainer, { panes } from '../containers/TabContainer';
import type { Organization } from '../types/organization';
import OrganizationList from '../components/OrganizationList';
import type User from '../types/user';
import { useGetCurrentUser, useGetOrganization } from '../shared/api';

const OrganizationPage = () => {
  // React Query

  // Projects are returned under and array
  type OrganizationData = Organization;

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  interface userData {
    user: User;
  }
  const userQuery = useGetCurrentUser();
  const id = userQuery.data ? userQuery.data.user.organization_id : 0;
  const orgQuery = useGetOrganization(id, { enabled: !!userQuery.data });
  const orgData = orgQuery.data;

  if (!orgData || !id) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: (
          <Menu.Item key="users">
            Users<Label>{orgData.organization.users.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <OrganizationList data={orgData.organization.users} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="active">Details</Menu.Item>,
        render: () => (
          <Tab.Pane>
            <h2>Name</h2> <h3>{orgData.organization.name}</h3>
          </Tab.Pane>
        ),
      },
    ];
    return (
      <TabContainer
        panes={panes}
        head={{
          content: `Organization`,
          subHeader1: 'See details as well as users part of your organization.',
        }}
      />
    );
  }
};

export default OrganizationPage;
