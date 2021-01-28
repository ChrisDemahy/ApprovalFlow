import React, { useState } from 'react';

// Imports for fetching data
import { useQueryClient, useMutation } from 'react-query';
import { loginUser } from '../shared/api';
import type User from '../types/user';
import { useHistory } from 'react-router-dom';
// Import
import Login from './Login';

const LoginContainer = () => {
  // email, setEmail, password, setPassword
  // Setup states for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  let history = useHistory();

  // React Query Mutation
  const queryClient = useQueryClient();
  const mutation = useMutation(loginUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      const { user, token }: { user: User; token: string } = res.data;
      // TODO Set user query data from here
      localStorage.token = token;
      queryClient.invalidateQueries('currentUser');
      // Go to next page or show error
      history.push('/projects');
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { email, password };
    mutation.mutate(user);
  };

  return (
    <Login
      setEmail={setEmail}
      email={email}
      setPassword={setPassword}
      password={password}
      onSubmit={onSubmit}
    />
  );
};

export default LoginContainer;
