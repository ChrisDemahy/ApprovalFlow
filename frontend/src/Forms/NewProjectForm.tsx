import React, { useState } from 'react';

// Semantic UI Imports
import {
  Button,
  Header,
  Container,
  Form,
  Message,
  Segment,
  Divider,
} from 'semantic-ui-react';

// Imports for interacting with api
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';

import { postProject } from '../shared/api';

import type Project from '../types/user';
import { useHistory } from 'react-router-dom';

const NewProjectForm = () => {
  // Setup state for the form
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const [apiError, setApiError] = useState(['']);

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.

  let history = useHistory();
  // React Query Mutation

  interface projectData {
    project: Project;
  }

  const mutation = useMutation(postProject, {
    onSuccess: (res) => {
      // const project = data.project;
      console.log(res.data);

      // Invalidate and refetch
      queryClient.invalidateQueries('projects');
      // Go to next page or show error
      history.push(`/projects/${res.data.id}`);
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
      <Header as="h3" content="Project Form" />

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
          placeholder={'Name'}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Header as="h5">Description</Header>
        <Form.Input
          placeholder={'Description'}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <Header as="h5">Total Cost</Header>
        <Form.Input
          placeholder={'TotalCost'}
          value={totalCost}
          onChange={(e) => {
            +e.target.value ? setTotalCost(+e.target.value) : setTotalCost(0);
          }}
        />
        <Divider />
        <Button size="large">Submit</Button>
      </Form>
    </>
  );
};

export default NewProjectForm;
