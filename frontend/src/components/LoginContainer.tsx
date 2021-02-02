import React, { useState } from 'react';

// Imports for fetching data
import { useQueryClient, useMutation } from 'react-query';
import { useLoginUser } from '../shared/api';
import { useHistory } from 'react-router-dom';
// Import
import Login from '../Forms/LoginForm';

const LoginContainer = () => {
  // email, setEmail, password, setPassword
  // Setup states for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  let history = useHistory();

  // React Query Mutation
  const queryClient = useQueryClient();
  const { apiError, mutation } = useLoginUser();
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
      // TODO Add Error To All Forms
      apiError={apiError}
    />
  );
};

export default LoginContainer;
