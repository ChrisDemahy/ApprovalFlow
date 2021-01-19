import React from 'react';
// Imports for fetching data
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import type User from '../types/user';
// Semantic UI Imports
import { Button, Container, Header, Segment } from 'semantic-ui-react';

// React Query
import { getCurrentUser } from '../shared/api';

const UserProfile = () => {
  // User type is returned under a user key in the response from the backend
  interface userData {
    user: User;
  }

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<userData, Error>(
    'user',
    getCurrentUser,
  );

  return (
    <>
      <Header
        as="h3"
        content="Text Container"
        style={{
          marginTop: '2em',
          padding: '2em 0em',
        }}
        textAlign="center"
      />
      <Container text>
        <Segment>
          <div />
          <Header as="h5">First Name</Header>
          <Segment>{data && data.user.first_name}</Segment>
          <Header as="h5">Last Name</Header>
          <Segment>{data && data.user.last_name} </Segment>
          <Header as="h5">Email Address</Header>
          <Segment>{data && data.user.email} </Segment>

          <Button fluid size="large">
            Update
          </Button>
        </Segment>
      </Container>
    </>
  );
};

export default UserProfile;
