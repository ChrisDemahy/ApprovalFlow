import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button,
  Header,
  Container,
  Form,
  Message,
  Segment,
} from 'semantic-ui-react';
import { postUser } from '../shared/api';
import type User from '../types/user';
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
];

const FormExampleFieldError = () => {
  const [email, setEmail] = useState('');
  // React Query Mutation
  const queryClient = useQueryClient();

  const mutation = useMutation(postUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      console.log('success');
      // Go to next page or show error
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(error);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { email };
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
          {/* <Form.Group widths="equal">
      <Form.Input fluid label="First name" placeholder="First name" error />
      <Form.Input fluid label="Last name" placeholder="Last name" />
    </Form.Group> */}
          {/* <Form.Input fluid label="First name" placeholder="First name" error /> */}
          {/* <Form.Input fluid label="Last name" placeholder="Last name" /> */}
          {/* <Form.Select options={options} placeholder="Gender" error /> */}
          {/* <Form.Checkbox label="I agree to the Terms and Conditions" error /> */}

          <Segment>
            <Message
              success
              header="Form Completed"
              content="Your account was successfully updated"
            />
            <Message
              error
              header="Action Forbidden"
              content="You can only sign up for an account once with a given e-mail address."
            />
            <Header as="h5">Email Address</Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
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

export default FormExampleFieldError;
