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

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  interface userData {
    user: User;
  }
  const userQuery = useGetCurrentUser();
  const userData = userQuery.data;
  const id = userData?.user ? userData.user.organization_id : 0;
  const orgQuery = useGetOrganization(id, { enabled: !!userData });
  const orgData = orgQuery.data;
  // Ensures that if the user loads up the details it resets to the main tab
  // TODO Make it so when a user navigates to /projects/details it renders correctly

  if (!userData || !orgData) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: {
          content: (
            <>
              Users<Label>{orgData.users.length}</Label>
            </>
          ),
          key: 'organization-users',
        },
        render: () => (
          <Tab.Pane>
            <OrganizationList data={orgData.users} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          content: <>Details</>,
          key: 'organization-details',
        },
        render: () => (
          <Tab.Pane>
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
      </>
    );
  }
};

export default OrganizationPage;
