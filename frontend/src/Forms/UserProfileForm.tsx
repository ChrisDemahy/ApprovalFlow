import React, { useState } from 'react';

// Semantic UI Imports
import {
  Button,
  Header,
  Container,
  Form,
  Message,
  Segment,
} from 'semantic-ui-react';

// Imports for interacting with api
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';

import { getCurrentUser, postUser } from '../shared/api';
import type User from '../types/user';

const UserProfileForm = () => {
  // Setup state for the form
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [apiError, setApiError] = useState(['']);

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // User type is returned under a user key in the response from the backend
  interface userData {
    user: User;
  }
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.

  // Query to fetch the current user data.
  const { data, error } = useQuery<userData, Error>('user', getCurrentUser);

  // React Query Mutation
  const mutation = useMutation(postUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      // Go to next page or show error
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
    const user = { email, firstName, lastName };
    mutation.mutate(user);
  };
  return (
    <>
      <Header
        as="h3"
        content="User Form"
        style={{ marginTop: '2em', padding: '2em 0em' }}
        textAlign="center"
      />
      <Container text>
        <Form
          onSubmit={onSubmit}
          size="large"
          error={mutation.isError}
          success={mutation.isSuccess}
          loading={mutation.isLoading}
        >
          <Segment>
            <Message
              success
              header="Form Completed"
              content="The Form was Successfully Submitted"
            />
            <Message error header="Action Forbidden" content={apiError} />

            <Header as="h5">First Name</Header>
            <Form.Input
              fluid
              // icon="user"
              // iconPosition="left"
              placeholder={data && data.user.first_name}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <Header as="h5">Last Name</Header>
            <Form.Input
              fluid
              // icon="user"
              // iconPosition="left"
              placeholder={data && data.user.last_name}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <Header as="h5">Email Address</Header>
            <Form.Input
              fluid
              // icon="user"
              // iconPosition="left"
              placeholder={data && data.user.email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Button fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
      </Container>
    </>
  );
};

export default UserProfileForm;
