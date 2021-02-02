import React from 'react';
// Imports for fetching data

import type User from '../types/user';
// Semantic UI Imports
import { Header } from 'semantic-ui-react';

// React Query
import { useGetCurrentUser } from '../shared/api';

const UserProfile = () => {
  // User type is returned under a user key in the response from the backend
  interface userData {
    user: User;
  }

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useGetCurrentUser();
  return (
    <>
      <Header as="h3" content="User Profile" />

      <Header as="h5" content="Name" />
      {data && data.user.name}

      <Header as="h5" content="Email Address" />
      {data && data.user.email}

      {/* <Button fluid size="large">
          Update
        </Button> */}
    </>
  );
};

export default UserProfile;
