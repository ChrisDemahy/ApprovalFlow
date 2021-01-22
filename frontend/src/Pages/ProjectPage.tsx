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

import { useParams } from 'react-router-dom';

// React Query axios functions
import { getProject } from '../shared/api';
import type Project from 'src/types/project';

interface projectData {
  project: Project;
}

const ProjectPage = () => {
  const { id }: { id: string } = useParams();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<projectData, Error>(
    ['project', +id],
    getProject(+id),
  );
  console.log(data);
  return data ? (
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
  ) : (
    <div>Loading...</div>
  );
};
export default ProjectPage;
