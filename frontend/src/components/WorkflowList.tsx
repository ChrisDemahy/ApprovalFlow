import React from 'react';
import { Loader, List, Image, Table, Header } from 'semantic-ui-react';
import type { ProjectData } from '../types/project';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import type User from '../types/user';

import type NotificationAlert from '../types/notification';
import type { ApprovalRequest } from '../types/notification';
import {
  getAllNotifications,
  getAllWorkflowRuns,
  getProject,
} from '../shared/api';
import CardList, { cardItem } from './CardList';
import type Workflowrun from '../types/workflowrun';
import { Link } from 'react-router-dom';

const WorkflowList = () => {
  const queryClient = useQueryClient();
  const id = '5';
  type WorkflowRuns = Workflowrun[];
  const { error, data, status, isFetching } = useQuery<WorkflowRuns, Error>(
    ['notifications'],
    getAllWorkflowRuns,
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
            <Table.HeaderCell>Date Last Updated</Table.HeaderCell>
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
              <Table.Cell>{formatDate(workflow_run.updated_at)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
};

export default WorkflowList;
