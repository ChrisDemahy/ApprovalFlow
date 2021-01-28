import React, { useEffect, useState } from 'react';
import CardList, { itemArray } from '../components/CardList';
import { getAllProjects, getCurrentUser, getOrganization } from '../shared/api';
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
import type { Organization } from '../types/organization';
import OrganizationList from '../components/OrganizationList';
import type User from '../types/user';

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
  const userQuery = useQuery<userData, Error>('currentUser', getCurrentUser);
  const orgId = userQuery.data?.user.organization_id;
  const orgQuery = useQuery<OrganizationData, Error>(
    ['organization', orgId ? orgId : 0],
    getOrganization(orgId ? orgId : 0),
    { enabled: !!userQuery.data },
  );
  const orgData = orgQuery.data;

  if (!orgData || !orgId) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: (
          <Menu.Item key="users">
            Users<Label>{orgData.users.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <OrganizationList data={orgData.users} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="active">Details</Menu.Item>,
        render: () => (
          <Tab.Pane>
            <h2>Name</h2> <h3>{orgData.name}</h3>
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
