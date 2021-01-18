import axios from 'axios';
import React, { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
// Semantic UI Imports
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
import type User from 'src/types/user';

interface Token {
  token: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const postUser = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return axios.post('http://localhost:3000/api/users/login', {
      email: email,
      password: password,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(postUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      // Go to next page or show error
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error</span>
      ) : (
        <span>Success</span>
      )}
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>
          <Form onSubmit={onSubmit} size="large">
            <Segment stacked>
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
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default Login;
