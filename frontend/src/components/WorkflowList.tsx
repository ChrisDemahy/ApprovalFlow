import React from 'react';
import { Loader, List, Image, Table, Header, Button } from 'semantic-ui-react';

import type Workflowrun from '../types/workflowrun';
import { Link } from 'react-router-dom';
import { useGetWorkflowRuns } from '../shared/api';

const WorkflowList = () => {
  // Data Fetcher
  const { error, data, status, isFetching } = useGetWorkflowRuns();
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
      <>
        <Header
          as="h2"
          content={'Workflows'}
          subheader={['See all the workflows that are currently active.']}
        />
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
            {data.map((workflow_run) => (
              <Table.Row key={workflow_run.id}>
                <Table.Cell>
                  <Header as="h4">{workflow_run.name}</Header>
                </Table.Cell>
                <Table.Cell>{workflow_run.status}</Table.Cell>
                <Table.Cell>{formatDate(workflow_run.created_at)}</Table.Cell>
                {/* <Table.Cell>{formatDate(workflow_run.updated_at)}</Table.Cell> */}
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/workflow_runs/${workflow_run.id}`}
                    basic
                  >
                    Open
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
};

export default WorkflowList;
