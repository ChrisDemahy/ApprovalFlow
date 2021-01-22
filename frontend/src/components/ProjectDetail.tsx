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
import { Button, Container, Header, Segment, Loader } from 'semantic-ui-react';

import { Link, useParams } from 'react-router-dom';

// React Query axios functions
import { getProject } from '../shared/api';
import type Project from 'src/types/project';

interface projectData {
  project: Project;
}

const ProjectDetail = () => {
  const { id }: { id: string } = useParams();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<Project, Error>(
    ['project', +id],
    getProject(+id),
  );
  console.log(data);
  return !!data ? (
    <>
      <Header as="h3" content="Project Details" />

      <Header as="h5" content="Name" />
      {data.name}
      <Header as="h5" content="Description" />
      {data.description}
      <Header as="h5" content="Total Cost" />
      {data.total_cost}

      <Button as={Link} to="/projectForm" fluid size="large">
        Update
      </Button>
    </>
  ) : (
    <Loader active />
  );
};
export default ProjectDetail;
