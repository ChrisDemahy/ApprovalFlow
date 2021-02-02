import React, { useState } from 'react';

// Semantic UI Imports
import { Button, Header, Form, Message } from 'semantic-ui-react';

// Imports for interacting with api

import { useGetCurrentUser, usePutUser } from '../shared/api';

const UserProfileForm = () => {
  // Setup state for the form
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Query to fetch the current user data.
  const { data, error } = useGetCurrentUser();

  // React Query Mutation
  const { mutation, apiError } = usePutUser();

  // When the user submits the form, assign the values to a user,
  // and mutate the user on the server with the new values
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { email, name };
    mutation.mutate(user);
  };
  return (
    <>
      <Header as="h3" content="User Form" />

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
          placeholder={data && data.user.name}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Header as="h5">Email Address</Header>
        <Form.Input
          placeholder={data && data.user.email}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Button size="large">Submit</Button>
      </Form>
    </>
  );
};

export default UserProfileForm;
