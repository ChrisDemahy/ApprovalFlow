import React, { useState } from 'react';

// Semantic UI Imports
import { Button, Header, Form, Message, Divider } from 'semantic-ui-react';

// Imports for interacting with api

import { usePostProject } from '../shared/api';

const NewProjectForm = () => {
  // Setup state for the form
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  // React Query Mutation

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
