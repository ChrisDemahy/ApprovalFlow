import React, { useContext, useState } from 'react';
import { Loader, List, Image, Table, Header, Button } from 'semantic-ui-react';

import { useQuery, useQueryClient } from 'react-query';
import type User from '../types/user';

import { getAllAuthorizations } from '../shared/api';

import type Workflowrun from '../types/workflowrun';

import type Authorization from 'src/types/authorization';
import { ModalContext } from './ApprovalModal';

const ApprovalList = () => {
  const [open, toggleOpen] = useState('OPEN');
  const { state, dispatch } = useContext(ModalContext);

  const queryClient = useQueryClient();
  const id = '5';
  type WorkflowRuns = Workflowrun[];
  type Authorizations = Authorization[];
  const { error, data, status, isFetching } = useQuery<Authorizations, Error>(
    ['authorizations'],
    getAllAuthorizations,
  );
  // Helper Methods
  const formatDate = (date_string: string) => {
    const d = Date.parse(date_string);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  };

  if (!data) {
    return <Loader />;
  } else {
    return (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Date Started</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((auth) => (
            <Table.Row
              onClick={(e: any) => dispatch({ type: open })}
              key={auth.id}
            >
              <Table.Cell>
                <Header as="h4">{auth.step ? auth.step.name : ''}</Header>
              </Table.Cell>
              <Table.Cell>{auth.status}</Table.Cell>
              <Table.Cell>{formatDate(auth.created_at)}</Table.Cell>
              <Table.Cell>
                <Button basic>Approve</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
};

export default ApprovalList;
