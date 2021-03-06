import React from 'react';
import type Authorization from '../types/authorization';
import { Loader, List, Image, Table, Header, Button } from 'semantic-ui-react';
import '../shared/semantic_table.css';

const ApprovalList = ({
  data,
  dispatchMethod,
}: {
  data: Authorization[];
  dispatchMethod: React.Dispatch<any>;
}) => {
  const formatDate = (date_string: string) => {
    const d = Date.parse(date_string);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  };

  const handleButton = (auth: Authorization) => {
    if (!!auth.step) {
      return dispatchMethod({
        type: 'OPEN',
        project_id: auth.step.project_id,
        authorization_id: auth.id,
      });
    }
  };
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
        {data.map((auth) =>
          auth.step ? (
            <Table.Row key={auth.id} onClick={() => handleButton(auth)}>
              <Table.Cell>
                <Header as="h4">{auth.step ? auth.step.name : ''}</Header>
              </Table.Cell>
              <Table.Cell>{auth.status}</Table.Cell>
              <Table.Cell>{formatDate(auth.created_at)}</Table.Cell>
              <Table.Cell>
                <Button
                  style={{
                    visibility:
                      auth.status === 'pending' ? 'visible' : 'hidden',
                  }}
                  basic
                >
                  Approve / Deny
                </Button>
              </Table.Cell>
            </Table.Row>
          ) : (
            <span />
          ),
        )}
      </Table.Body>
    </Table>
  );
};

export default ApprovalList;
