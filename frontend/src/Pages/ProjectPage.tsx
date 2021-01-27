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
import { getProject } from '../shared/api';
import type { ProjectData } from '../types/project';
import type { AxiosError } from 'axios';
import StepTable from '../components/StepTable';
import ProjectDetail from '../components/ProjectDetails';
import WorkflowRunList from '../components/WorkflowRunList';
import ProjectSubmissionForm from '../Forms/ProjectSubmissionForm';
import TabContainer, { panes } from '../containers/TabContainer';

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

  if (!data) {
    return <Loader />;
  } else {
    const panes: panes = [
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

    return (
      <>
        <TabContainer
          panes={panes}
          head={{
            content: `Project ${data.project.name}`,
            subHeader1:
              'Manage details about your project and see previous workflows.',
            subHeader2: 'When your ready submit it for approval.',
          }}
        />
      </>
    );
  }
};
export default ProjectPage;
