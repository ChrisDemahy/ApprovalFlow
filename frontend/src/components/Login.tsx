import React, { useContext } from 'react';

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

// Imports for fetching data

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import axios from 'axios';
import type User from 'src/types/user';
import { UserContext } from './UserContextProvider';

async function loginUser({ email, password }: User) {
  try {
    const response = await axios.post('/login', {
      email: email,
      password: password,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  try {
    const response = await axios.get('/user');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Access the client
const queryClient = useQueryClient();

// Queries
const query = useQuery('todos', getUser);

// Mutations
const mutation = useMutation(loginUser, {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries('todos');
  },
});

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const setUser = (user: User) => {
    dispatch({
      type: 'set_user',
      user: user,
    });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
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
  );
};

export default Login;
