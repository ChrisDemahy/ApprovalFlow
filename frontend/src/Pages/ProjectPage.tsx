import React, { useState } from 'react';
// Imports for fetching data
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import type User from '../types/user';
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
import { getProject, submitProject } from '../shared/api';
import type { ProjectData } from '../types/project';
import type { AxiosError } from 'axios';
import StepTable from '../components/StepTable';
import ProjectDetail from '../components/ProjectDetails';
import WorkflowRunList from '../components/WorkflowRunList';
import ProjectSubmissionForm from '../Forms/ProjectSubmissionForm';

const ProjectPage = () => {
  const { id }: { id: string } = useParams();
  const [apiError, setApiError] = useState(['']);

  let history = useHistory();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<ProjectData, Error>(
    ['project', +id],
    getProject(+id),
  );

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // User type is returned under a user key in the response from the backend
  interface userData {
    user: User;
  }

  const renderTabs = (data: ProjectData) => {
    // One pane for each tab, rendering it's components
    const panes = [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane>
            <ProjectDetail project={data.project} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="messages">
            Previous Workflows<Label>{data.project.previous_runs.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <WorkflowRunList workflows={data.project.previous_runs} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Submit For Approval',
        render: () => (
          <Tab.Pane>
            <ProjectSubmissionForm project={data.project} />
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
        content={`Project ${data.project.name}`}
        subheader={[
          'Manage details about your project and see previous workflows. When your ready',
          <br />,
          ' submit it for approval.',
        ]}
      />
      {renderTabs(data)}
    </>
  ) : (
    <Loader active />
  );
};
export default ProjectPage;
