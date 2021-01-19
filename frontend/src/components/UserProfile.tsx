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

import { Button, Container, Header, Segment } from 'semantic-ui-react';

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
};

import { getCurrentUser } from '../shared/api';

export type QueryResponse = {
  [key: string]: string;
};

const UserProfile = () => {
  // Access the client
  const queryClient = useQueryClient();

  interface userData {
    user: User;
  }

  // Queries
  const { error, data, status, isFetching } = useQuery<userData, Error>(
    'user',
    getCurrentUser,
  );

  return (
    <>
      <Header
        as="h3"
        content="Text Container"
        style={style.h3}
        textAlign="center"
      />
      <Container text>
        <Segment>
          <Header as="h5">Email Address</Header>
          <Segment>Email: {data && data.user.email} </Segment>
          <Segment>Content</Segment>
          <Segment>Content</Segment>
          <Segment>Content</Segment>

          <Button fluid size="large">
            Submit
          </Button>
        </Segment>
      </Container>
    </>
  );
};

export default UserProfile;
