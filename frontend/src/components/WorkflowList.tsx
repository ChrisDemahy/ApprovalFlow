import React from 'react';
import { Button, Divider, Header, Loader } from 'semantic-ui-react';
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
  return (
    <>
      {data ? (
        <>
          <Header as="h3" content="Notification" />
          <CardList
            items={data.map(
              (workflow_run: Workflowrun): cardItem => {
                const new_card = {
                  header: workflow_run.name,
                  description: workflow_run.description,
                  meta: `${workflow_run.id}`,
                  extra: (
                    <Button
                      fluid
                      as={Link}
                      to={`/workflow_runs/${workflow_run.id}`}
                    >
                      Open
                    </Button>
                  ),
                };
                return new_card;
              },
            )}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default WorkflowList;
