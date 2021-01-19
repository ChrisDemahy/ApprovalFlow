import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import type User from '../types/user';

// TODO Render waiting approvals for a user
// Maybe give multiple values/filters

const extra = (
  <a>
    <Icon name="user" />
    16 Approvals waiting
  </a>
);

const UserCard = ({ user }: { user: User }) => (
  <Card
    header={`${user.first_name} ${user.last_name}`}
    meta="Organization Member" //TODO Add organization name
    extra={extra}
  />
);

export default UserCard;
