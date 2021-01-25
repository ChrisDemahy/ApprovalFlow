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

const WorkflowPage = () => {
  // WorkflowRun ID
  const { id }: { id: string } = useParams();
  const [apiError, setApiError] = useState(['']);

  let history = useHistory();

  // Query to fetch the current project data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<WorkflowRunData, Error>(
    ['workflow_run', +id],
    getWorkflowRun(+id),
  );

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // project type is returned under a project key in the response from the backend

  const renderTabs = (data: WorkflowRunData) => {
    // One pane for each tab, rendering it's components
    const panes = [
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

    return <Tab panes={panes} />;
  };

  // Check data isn't undefined
  return !!data ? (
    <>
      <Header
        as="h2"
        content={`Project ${data.workflow_run.name}`}
        subheader={[
          <span key="project-page-subheader-1">
            Manage details about your project and see previous workflows. When
            your ready
          </span>,
          <br key="project-page-subheader-2" />,
          <span key="project-page-subheader-3">submit it for approval.</span>,
        ]}
      />
      {renderTabs(data)}
    </>
  ) : (
    <Loader active />
  );
};
export default WorkflowPage;
