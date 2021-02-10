import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Table, Header, Button } from 'semantic-ui-react';
import type { Workflowrun } from '../types/workflowrun';

const WorkflowRunList = ({ workflows }: { workflows: Workflowrun[] }) => {
  // Helper Methods
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
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Date Started</Table.HeaderCell>
          <Table.HeaderCell>Date Last Updated</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {workflows.map((workflow) => (
          <Table.Row key={workflow.id}>
            <Table.Cell>
              <Header as="h4">{workflow.name}</Header>
            </Table.Cell>
            <Table.Cell>{workflow.status}</Table.Cell>
            <Table.Cell>{formatDate(workflow.created_at)}</Table.Cell>
            <Table.Cell>
              <Button as={Link} to={`/workflows/${workflow.id}`}>
                Open
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
export default WorkflowRunList;
