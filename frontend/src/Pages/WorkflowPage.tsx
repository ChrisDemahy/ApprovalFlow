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

  // Ensures that if the user loads up the details it resets to the main tab
  // TODO Make it so when a user navigates to /projects/details it renders correctly
  const history = useHistory();
  useEffect(() => {
    history.push(`/workflow/${+id}`);
  }, []);

  if (!data) {
    return <Loader />;
  } else {
    const the_steps = data.workflow_run.steps.reverse();
    const panes: panes = [
      {
        menuItem: {
          as: Link,
          content: <>Details</>,
          to: `/workflow/${+id}`,
          exact: true,
          key: 'workflow-details',
        },
        render: () => (
          <Route path={`/workflow/${+id}`} exact key="workflow-details-pane">
            <Tab.Pane>
              {<WorkflowDetails workflow_run={data.workflow_run} />}
            </Tab.Pane>
          </Route>
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
        menuItem: {
          as: Link,
          content: <>Steps</>,
          to: `/workflow/${+id}/steps`,
          exact: true,
          key: 'workflow-steps',
        },
        render: () => (
          <Route
            path={`/workflow/${+id}/steps`}
            exact
            key="workflow-steps-pane"
          >
            <Tab.Pane>
              <StepTable steps={the_steps} />
            </Tab.Pane>
          </Route>
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
