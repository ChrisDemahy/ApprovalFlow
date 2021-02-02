import React, { useState } from 'react';

// Semantic UI Imports
import {
  Button,
  Header,
  Form,
  Message,
  Loader,
  Divider,
} from 'semantic-ui-react';

// Imports for interacting with api
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';

import { useGetProject, usePostProject } from '../shared/api';

import type { ProjectData } from '../types/project';
import { useHistory, useParams } from 'react-router-dom';

const ProjectForm = () => {
  // Setup state for the form
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  // Get the id of the current project being updated
  const { id }: { id: string } = useParams();

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.

  let history = useHistory();
  // React Query Mutation

  const { error, data, status, isFetching } = useGetProject(+id);

  const { mutation, apiError } = usePostProject();
  // When the user submits the form, assign the values to a user,
  // and mutate the user on the server with the new values
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const total_cost = totalCost;
    const project = { description, name, total_cost };
    mutation.mutate(project);
  };
  return (
    <>
      {data ? (
        <>
          <Header as="h3" content={'Update Project'} />

          <Form
            onSubmit={onSubmit}
            error={mutation.isError}
            success={mutation.isSuccess}
            loading={mutation.isLoading}
            size="small"
          >
            <Message
              success
              header="Form Completed"
              content="The Form was Successfully Submitted"
            />
            <Message error header="Action Forbidden" content={apiError} />
            <Header as="h5">Name</Header>

            <Form.Input
              placeholder={data.project.name}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Header as="h5">Description</Header>
            <Form.Input
              placeholder={data.project.description}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Header as="h5">Total Cost</Header>
            <Form.Input
              placeholder={data.project.total_cost}
              value={totalCost === 0 ? '' : totalCost}
              onChange={(e) => {
                +e.target.value
                  ? setTotalCost(+e.target.value)
                  : setTotalCost(0);
              }}
            />
            <Divider />
            <Button size="large">Submit</Button>
          </Form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectForm;
