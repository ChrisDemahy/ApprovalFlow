import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Icon, Loader, Table } from 'semantic-ui-react';
import { getProject, getWorkflowRun } from '../shared/api';
import type { Workflowrun } from '../types/workflowrun';
import type Step from '../types/step';
import type Project from 'src/types/project';
const StepTable = () => {
  const { id }: { id: string } = useParams();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.

  const { error, data, status, isFetching } = useQuery<Workflowrun, Error>(
    ['workflow_run', +id],
    getWorkflowRun(+id),
    {},
  );

  const statusMessage = (status: string) => {
    if (status == 'approved') {
      return 'Approved';
    } else if (status == 'denied') {
      return 'Denied';
    } else if (status == 'pending') {
      return 'Action Required';
    }
  };

  return (
    <>
      {!!data ? (
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Approval Assignment Date</Table.HeaderCell>
              <Table.HeaderCell>Premium Plan</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.steps.map((step) => (
              <Table.Row
                positive={step.status == 'approved'}
                negative={step.status == 'denied'}
                warning={step.status == 'pending'}
              >
                <Table.Cell collapsing>
                  <Checkbox slider />
                </Table.Cell>
                <Table.Cell>{step.name}</Table.Cell>
                <Table.Cell>{statusMessage(step.status)}</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>{step}</Table.Cell>
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
      ) : (
        <Loader />
      )}
    </>
  );
};
export default StepTable;
