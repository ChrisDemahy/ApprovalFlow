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
import { postWorkflowRun } from '../shared/api';
import { useParams, useHistory } from 'react-router';

import type { ProjectData } from '../types/project';
import type { WorkflowRunData } from '../types/workflowrun';
const ProjectForm = ({ project }: ProjectData) => {
  // Setup state for the form
  const { id }: { id: string } = useParams();

  const [apiError, setApiError] = useState(['']);
  const [description, setDescription] = useState('');
  // TODO Format Name
  // Workflow Name Default Format
  const initName = !!project.user
    ? `${project.user.name}'s ${project.name} Approval Workflow`
    : `${project.name} Approval Workflow`;
  const [name, setName] = useState(initName);
  const [totalCost, setTotalCost] = useState(project.total_cost);

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  const history = useHistory();
  // React Query Muation

  const mutation = useMutation(postWorkflowRun, {
    onSuccess: ({ data }: { data: WorkflowRunData }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['project', +id]);

      // Get The id of the new workflow_run
      // Go to next page or show error
      history.push(`/workflow_runs/${data.workflow_run.id}`);
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
      name,

      description,
      id,
    });
  };
  return (
    <>
      <Header as="h3" content={'Submit Worfklow for Project Approval'} />

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
          placeholder={'An Example Description for '}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <Divider />
        <Button size="large">Submit</Button>
      </Form>
    </>
  );
};

export default ProjectForm;
