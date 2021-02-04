import React, { useEffect, useState } from 'react';
import CardList, { itemArray } from '../components/CardList';

import { Link, Redirect, Route } from 'react-router-dom';
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
  console.log(userQuery.data);
  const id = userQuery.data ? userQuery.data.user.organization_id : 0;
  const orgQuery = useGetOrganization(id, { enabled: !!userQuery.data });
  const orgData = orgQuery.data;

  if (!orgData || !id) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: (
          <Menu.Item as={Link} to="/organization/users" key="users">
            Users<Label>{orgData.users.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Route} path="/organization/users">
            <OrganizationList data={orgData.users} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item as={Link} to="/organization/details" key="active">
            Details
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Route} path="/organization/details">
            <h2>Name</h2> <h3>{orgData.name}</h3>
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
            content: `Organization`,
            subHeader1:
              'See details as well as users part of your organization.',
          }}
        />
        {/* Redirect to defualt route */}
        <Redirect from="/organization/" strict exact to="/organization/users" />
      </>
    );
  }
};

export default OrganizationPage;
