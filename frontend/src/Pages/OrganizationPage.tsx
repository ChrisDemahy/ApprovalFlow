import React, { useEffect, useState } from 'react';
import CardList, { itemArray } from '../components/CardList';

import { Link, NavLink, Redirect, Route, useHistory } from 'react-router-dom';
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
  // console.log(userQuery.data);
  const id = userQuery.data?.user ? userQuery.data.user.organization_id : 0;
  const orgQuery = useGetOrganization(id, { enabled: !!userQuery.data });
  const orgData = orgQuery.data;
  // Ensures that if the user loads up the details it resets to the main tab
  // TODO Make it so when a user navigates to /projects/details it renders correctly
  const history = useHistory();
  useEffect(() => {
    history.push('/organization');
  }, []);

  const panes: panes = [
    {
      menuItem: {
        as: NavLink,
        content: (
          <>
            Users<Label>{!!orgData ? orgData.users.length : 0}</Label>
          </>
        ),
        to: '/organization',
        exact: true,
        key: 'organization-users',
      },
      render: () => (
        <Route path="/organization" exact key="organization-users-pane">
          <Tab.Pane>
            {!!orgData ? <OrganizationList data={orgData.users} /> : <Loader />}
          </Tab.Pane>
        </Route>
      ),
    },
    {
      menuItem: {
        as: NavLink,
        content: <>Details</>,
        to: '/organization/details',
        exact: true,
        key: 'organization-details',
      },
      render: () => (
        <Route
          path="/organization/details"
          exact
          key="organization-details-pane"
        >
          <Tab.Pane>
            <h2>Name</h2> <h3>{orgData?.name ?? ''}</h3>
          </Tab.Pane>
        </Route>
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
          subHeader1: 'See details as well as users part of your organization.',
        }}
      />
    </>
  );
};

export default OrganizationPage;
