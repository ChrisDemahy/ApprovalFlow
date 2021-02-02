import React, { useState } from 'react';

// Semantic UI Imports
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
// Font Awesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faLock } from '@fortawesome/free-solid-svg-icons';
import OrganizationOptions from '../components/OrganizationOptions';

interface loginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  organization: number;
  setOrganization: React.Dispatch<React.SetStateAction<number>>;
  doa: number;
  setDoa: React.Dispatch<React.SetStateAction<number>>;
  supervisor: number;
  setSupervisor: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const SignUp = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  organization,
  setOrganization,
  doa,
  setDoa,
  name,
  setName,
  supervisor,
  setSupervisor,
}: loginProps) => {
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
        inverted
      >
        <>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              <span style={{ marginRight: '0.4em' }}>
                <FontAwesomeIcon
                  style={{
                    height: '20px',
                    width: '20px',
                  }}
                  icon={faStream}
                />{' '}
                Approval Flow
              </span>
            </Header>
            <Form onSubmit={onSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="name"
                  type="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="doa"
                  type="doa"
                  value={doa}
                  onChange={(e) => {
                    setDoa(+e.target.value);
                  }}
                />
                <OrganizationOptions
                  organization={organization}
                  setOrganization={setOrganization}
                  supervisor={supervisor}
                  setSupervisor={setSupervisor}
                />
                <Divider />

                <Button fluid color="green">
                  Sign Up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </>
      </Grid>
    </>
  );
};
export default SignUp;
