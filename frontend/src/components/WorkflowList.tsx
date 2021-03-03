import React, { useEffect } from 'react';
import { Loader, List, Image, Table, Header, Button } from 'semantic-ui-react';

import type Workflowrun from '../types/workflowrun';
import { Link, useHistory } from 'react-router-dom';
import { useGetWorkflowRuns } from '../shared/api';

import '../shared/semantic_table.css';

const WorkflowList = ({ data }: { data: Workflowrun[] }) => {
  // Data Fetcher

  // Helper Methods
  const formatDate = (date_string: string) => {
    const d = Date.parse(date_string);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  };
  const history = useHistory();
  if (!data) {
    return <Loader />;
  } else {
    return (
      <>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Project Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Date Started</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((workflow_run) => (
              <Table.Row
                onClick={() => {
                  history.push(`/workflow/${workflow_run.id}`);
                }}
                key={workflow_run.id}
              >
                <Table.Cell>
                  <Header as="h4">{workflow_run.name}</Header>
                </Table.Cell>
                <Table.Cell>{workflow_run.status.replace('_', ' ')}</Table.Cell>
                <Table.Cell>{formatDate(workflow_run.created_at)}</Table.Cell>
                {/* <Table.Cell>{formatDate(workflow_run.updated_at)}</Table.Cell> */}
                <Table.Cell>
                  <Button as={Link} to={`/workflow/${workflow_run.id}`} basic>
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
