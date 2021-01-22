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
import type Project from 'src/types/project';

interface projectData {
  project: Project;
}

const ProjectPage = () => {
  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<projectData, Error>(
    'user',
    getCurrentUser,
  );

  return (
    <>
      <Header as="h3" content="User Profile" />
      {/* 
      <Header as="h5" content="First Name" />
      {data && data.user.first_name}
      <Header as="h5" content="Last Name" />
      {data && data.user.last_name}
      <Header as="h5" content="Email Address" />
      {data && data.user.email} */}

      {/* <Button fluid size="large">
          Update
        </Button> */}
    </>
  );
};
export default ProjectPage;
