import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import { getWorkflowRun } from 'src/shared/api';
import type { Workflowrun } from 'src/types/workflowrun';
import type Step from '../types/step';
const StepTable = () => {
  const { id }: { id: string } = useParams();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<Workflowrun, Error>(
    ['workflow_run', +id],
    getWorkflowRun(+id),
  );
  const steps = data;
  return (
    <Table compact celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Approval Assignment Date</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
          <Table.HeaderCell>Premium Plan</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {steps.map((step) => (
          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>{step}</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="4">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="user" /> Add User
            </Button>
            <Button size="small">Approve</Button>
            <Button disabled size="small">
              Approve All
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
export default StepTable;
