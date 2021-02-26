import React, { useState } from 'react';

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
// Font Awesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface loginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onGuestSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onSignUpSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  apiError: string[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}
const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  onGuestSubmit,
  onSignUpSubmit,
  isSuccess,
  isError,
  isLoading,

  apiError, // FIXME User this
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
                <Button.Group widths="3">
                  <Button onClick={onSignUpSubmit} color="green">
                    New Here?
                  </Button>
                  <Button onClick={onGuestSubmit} color="red" size="large">
                    Guest Login
                  </Button>
                  <Button color="blue" size="large">
                    Login
                  </Button>
                </Button.Group>
              </Segment>
            </Form>
          </Grid.Column>
        </>
      </Grid>
    </>
  );
};
export default Login;
