import React, { useState } from 'react';

// Imports for fetching data
import { usePostUser } from '../shared/api';

import SignUp from '../Forms/SignUpForm';

const SignUpContainer = () => {
  // email, setEmail, password, setPassword
  // Setup states for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [doa, setDoa] = useState(0);
  const [supervisor, setSupervisor] = useState(0);
  const [status, setStatus] = useState('');
  const [organization, setOrganization] = useState(0);

  // React Query Mutation
  const { mutation } = usePostUser();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const organization_id = organization;
    const supervisor_id = supervisor;
    const user = { email, password, organization_id, doa, name, supervisor_id };
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
      name={name}
      setName={setName}
      doa={doa}
      setDoa={setDoa}
      supervisor={supervisor}
      setSupervisor={setSupervisor}
    />
  );
};

export default SignUpContainer;
