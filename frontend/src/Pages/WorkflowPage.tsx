import React, { useState } from 'react';
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

import { Link, useHistory, useParams } from 'react-router-dom';

// React Query axios functions
import { getProject, getWorkflowRun } from '../shared/api';

import type { AxiosError } from 'axios';
import StepTable from '../components/StepTable';
import ProjectDetail from '../components/ProjectDetails';
import WorkflowRunList from '../components/WorkflowRunList';
import ProjectSubmissionForm from '../Forms/ProjectSubmissionForm';
import type { WorkflowRunData } from '../types/workflowrun';
import WorkflowDetails from '../components/WorkflowDetails';
import TabContainer, { panes } from '../containers/TabContainer';

const WorkflowPage = () => {
  // WorkflowRun ID
  const { id }: { id: string } = useParams();

  // Query to fetch the current project data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<WorkflowRunData, Error>(
    ['workflow_run', +id],
    getWorkflowRun(+id),
  );

  if (!data) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane>
            {<WorkflowDetails workflow_run={data.workflow_run} />}
          </Tab.Pane>
        ),
      },
      // {
      //   menuItem: (
      //     <Menu.Item key="messages">
      //       {/* Previous Workflows<Label>{data.project.previous_runs.length}</Label> */}
      //     </Menu.Item>
      //   ),
      //   render: () => (
      //     <Tab.Pane>
      //       {/* <WorkflowRunList workflows={data.project.previous_runs} /> */}
      //     </Tab.Pane>
      //   ),
      // },
      {
        menuItem: 'Steps',
        render: () => (
          <Tab.Pane>
            <StepTable steps={data.workflow_run.steps} />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <>
        <TabContainer
          panes={panes}
          head={{
            content: `Workflow ${data.workflow_run.name}`,
            subHeader1:
              'Manage details about this workflow and see who is up for approval',
          }}
        />
      </>
    );
  }
};

export default WorkflowPage;
