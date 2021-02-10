import React, { useState } from 'react';

// Semantic UI Imports
import { Loader, Tab, Menu, Label } from 'semantic-ui-react';

import { Link, useHistory, useParams } from 'react-router-dom';

// React Query axios functions
import ProjectDetail from '../components/ProjectDetails';
import WorkflowRunList from '../components/WorkflowRunList';
import ProjectSubmissionForm from '../Forms/ProjectSubmissionForm';
import TabContainer, { panes } from '../containers/TabContainer';
import { useGetProject } from '../shared/api';

const ProjectPage = () => {
  const { id }: { id: string } = useParams();
  const [apiError, setApiError] = useState(['']);

  let history = useHistory();

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useGetProject(+id);

  const panes: panes = [
    {
      menuItem: 'Details',
      render: () => (
        <Tab.Pane>
          {!!data ? <ProjectDetail project={data.project} /> : <Loader />}
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="messages">
          Previous Workflows
          <Label>{data?.project.previous_runs.length ?? 0}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {!!data ? (
            <WorkflowRunList workflows={data.project.previous_runs} />
          ) : (
            <Loader />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Submit For Approval',
      render: () => (
        <Tab.Pane>
          {!!data ? (
            <ProjectSubmissionForm project={data.project} />
          ) : (
            <Loader />
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <TabContainer
        panes={panes}
        head={{
          content: `Project ${data?.project.name ?? ''}`,
          subHeader1:
            'Manage details about your project and see previous workflows.',
        }}
      />
    </>
  );
};
export default ProjectPage;
