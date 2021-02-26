import React, { useState } from 'react';

// Semantic UI Imports
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';
// Font Awesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faStream,
  faLock,
  faDollarSign,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import OrganizationOptions from '../components/OrganizationOptions';
import type { UseMutationResult } from 'react-query';
import type { AxiosError } from 'axios';
import type User from '../types/user';
interface userData {
  user: User;
}
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
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  apiError: string[];
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
  apiError,
  isSuccess,
  isError,
  isLoading,
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
            <Form
              onSubmit={onSubmit}
              size="large"
              error={isError}
              success={isSuccess}
              loading={isLoading}
            >
              <Segment stacked>
                <Message
                  success
                  header="Form Completed"
                  content="The Form was Successfully Submitted"
                />
                <Message error header="Action Forbidden" content={apiError} />
                <Form.Input
                  fluid
                  labelPosition="left"
                  placeholder="name"
                  type="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                >
                  <Label basic>
                    <FontAwesomeIcon
                      style={{
                        height: '20px',
                        width: '20px',
                      }}
                      icon={faUser}
                    />
                  </Label>
                  <input />
                </Form.Input>
                <Form.Input
                  fluid
                  labelPosition="left"
                  placeholder="E-mail address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                >
                  <Label basic>
                    <FontAwesomeIcon
                      style={{
                        height: '20px',
                        width: '20px',
                      }}
                      icon={faEnvelope}
                    />
                  </Label>
                  <input />
                </Form.Input>
                <Form.Input
                  fluid
                  labelPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                >
                  <Label basic>
                    <FontAwesomeIcon
                      style={{
                        height: '20px',
                        width: '20px',
                      }}
                      icon={faLock}
                    />
                  </Label>
                  <input />
                </Form.Input>
                <Form.Input
                  // fluid
                  // iconPosition="left"
                  labelPosition="right"
                  placeholder="doa"
                  type="text"
                  value={doa === 0 ? '' : doa}
                  onChange={(e) => {
                    if (Number(e.target.value)) {
                      setDoa(+e.target.value);
                    } else if (e.target.value === '') {
                      setDoa(0);
                    }
                  }}
                >
                  <Label basic>
                    <FontAwesomeIcon
                      style={{
                        height: '20px',
                        width: '20px',
                      }}
                      icon={faDollarSign}
                    />
                  </Label>
                  <input />
                  <Label>.00</Label>
                </Form.Input>
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
