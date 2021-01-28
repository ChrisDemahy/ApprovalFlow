import React from 'react';

import { Loader, List, Image, Table, Header, Button } from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';
import type { Organization } from 'src/types/organization';
import type User from 'src/types/user';

const OrganizationList = ({ data }: { data: User[] }) => {
  const history = useHistory();
  const formatDate = (date_string: string) => {
    const d = Date.parse(date_string);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  };
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>DOA</Table.HeaderCell>
          <Table.HeaderCell>Date Started</Table.HeaderCell>
          <Table.HeaderCell>Supervisor</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Header as="h4">{user.name}</Header>
            </Table.Cell>
            <Table.Cell>{user.DOA ? user.DOA : ''}</Table.Cell>
            <Table.Cell>{formatDate(user.created_at)}</Table.Cell>

            <Table.Cell>
              {() => {
                const item = data.find(
                  (item) => item.id === user.supervisor_id,
                );
                !!item ? item.name : '';
              }}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default OrganizationList;
