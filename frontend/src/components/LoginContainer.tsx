import React, { useState } from 'react';

// Imports for fetching data
import { useQueryClient, useMutation } from 'react-query';
import { postUser } from '../shared/api';
import type User from 'src/types/user';

// Import
import Login from './Login';

const LoginContainer = () => {
  // email, setEmail, password, setPassword
  // Setup states for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation(postUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      const { user }: { user: User } = res.data;
      // TODO Set user query data from here
      localStorage.token = res.data.user.token;
      queryClient.invalidateQueries('user');
      // Go to next page or show error
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
