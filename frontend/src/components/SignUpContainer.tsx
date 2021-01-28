import React, { useState } from 'react';

// Imports for fetching data
import { useQueryClient, useMutation } from 'react-query';
import { loginUser, postUser } from '../shared/api';
import type User from '../types/user';
import { useHistory } from 'react-router-dom';
// Import
import Login from './Login';
import SignUp from './SignUp';

const SignUpContainer = () => {
  // email, setEmail, password, setPassword
  // Setup states for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [organization, setOrganization] = useState(0);
  let history = useHistory();

  // React Query Mutation
  const queryClient = useQueryClient();
  const mutation = useMutation(postUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      const { user, token }: { user: User; token: string } = res.data;
      // TODO Set user query data from here
      localStorage.token = token;
      queryClient.invalidateQueries('currentUser');
      // Go to next page or show error
      history.push('/login');
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const organization_id = organization;
    const user = { email, password, organization_id };
    mutation.mutate(user);
  };

  return (
    <SignUp
      setEmail={setEmail}
      email={email}
      setPassword={setPassword}
      password={password}
      onSubmit={onSubmit}
      organization={organization}
      setOrganization={setOrganization}
    />
  );
};

export default SignUpContainer;
