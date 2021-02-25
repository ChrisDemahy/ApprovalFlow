import React, { useEffect, useState } from 'react';
// Imports for fetching data
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import type project from '../types/project';
// Semantic UI Imports
import {
  Button,
  Container,
  Header,
  Segment,
  Loader,
  Divider,
  Tab,
  Menu,
  Label,
} from 'semantic-ui-react';

import {
  Link,
  Route,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import type { AxiosError } from 'axios';
import StepTable from '../components/StepTable';
import ProjectDetail from '../components/ProjectDetails';
import WorkflowRunList from '../components/WorkflowRunList';
import ProjectSubmissionForm from '../Forms/ProjectSubmissionForm';
import type { WorkflowRunData } from '../types/workflowrun';
import WorkflowDetails from '../components/WorkflowDetails';
import TabContainer, { panes } from '../containers/TabContainer';
import { useGetWorkflowRun } from '../shared/api';

const WorkflowPage = () => {
  // WorkflowRun ID
  const { id }: { id: string } = useParams();

  // Query to fetch the current project data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useGetWorkflowRun(+id);

  if (!data) {
    return <Loader />;
  } else {
    const the_steps = data.workflow_run.steps.reverse();
    const panes: panes = [
      {
        menuItem: {
          content: <>Details</>,
          key: 'workflow-details',
        },
        render: () => (
          <Tab.Pane>
            {<WorkflowDetails workflow_run={data.workflow_run} />}
          </Tab.Pane>
        ),
      },

      {
        menuItem: {
          content: <>Steps</>,
          key: 'workflow-steps',
        },
        render: () => (
          <Tab.Pane>
            <StepTable steps={the_steps} />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <TabContainer
        panes={panes}
        head={{
          content: `Workflow ${data.workflow_run.name}`,
          subHeader1:
            'Manage details about this workflow and see who is up for approval',
        }}
      />
    );
  }
};

export default WorkflowPage;
