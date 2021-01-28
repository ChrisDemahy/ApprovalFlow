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
}
const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
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
                <Button.Group widths="2">
                  <Button as={Link} to="/signUp" color="green">
                    New Here?
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
