import React, { useState } from 'react';
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
import {
  Button,
  Container,
  Header,
  Segment,
  Loader,
  Divider,
} from 'semantic-ui-react';

import { Link, useHistory, useParams } from 'react-router-dom';

// React Query axios functions
import { getProject, submitProject } from '../shared/api';
import type { ProjectData } from 'src/types/project';
import type { AxiosError } from 'axios';
import StepTable from './StepTable';

const ProjectDetail = () => {
  const { id }: { id: string } = useParams();
  const [apiError, setApiError] = useState(['']);

  let history = useHistory();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<ProjectData, Error>(
    ['project', +id],
    getProject(+id),
  );

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // User type is returned under a user key in the response from the backend
  interface userData {
    user: User;
  }

  // React Query Mutation
  const mutation = useMutation(submitProject, {
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['project', +id]);
      // Go to next page or show error
      history.push('/workflow_runs/');
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!!data) {
      const { name, total_cost, id, description } = data.project;
      const status: string = 'pending_workflow';
      mutation.mutate({
        id,
        name,
        total_cost,
        description,
        status,
        workflow_template_id: 1,
      });
    }
  };
  console.log(data);
  return !!data ? (
    <>
      <Header as="h3" content="Project Details" />

      <Header as="h5" content="Name" />
      {data.project.name}
      <Header as="h5" content="Description" />
      {data.project.description}
      <Header as="h5" content="Total Cost" />
      {data.project.total_cost}
      <Header as="h5" content="Status" />
      {data.project.status}
      <Divider />
      <Button onClick={onClick} fluid size="large">
        Submit Project for Approval
      </Button>
    </>
  ) : (
    <Loader active />
  );
};
export default ProjectDetail;
