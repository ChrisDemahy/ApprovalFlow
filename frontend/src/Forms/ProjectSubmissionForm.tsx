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
import { submitProject } from '../shared/api';
import { useParams, useHistory } from 'react-router';

import type { ProjectData } from '../types/project';
const ProjectForm = ({ project }: ProjectData) => {
  // Setup state for the form
  const { id }: { id: string } = useParams();

  const [apiError, setApiError] = useState(['']);
  const [description, setDescription] = useState(project.description);
  const [name, setName] = useState(project.name);
  const [totalCost, setTotalCost] = useState(project.total_cost);

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  const history = useHistory();
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

  // When the user submits the form, assign the values to a user,
  // and mutate the user on the server with the new values
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id, name, total_cost, description, status } = project;
    mutation.mutate({
      id,
      name,
      total_cost,
      description,
      status,
      workflow_template_id: 1,
    });
  };
  return (
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
          placeholder={name}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Header as="h5">Description</Header>
        <Form.Input
          placeholder={description}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Header as="h5">Total Cost</Header>
        <Form.Input
          placeholder={totalCost}
          value={totalCost === 0 ? '' : totalCost}
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

export default ProjectForm;
