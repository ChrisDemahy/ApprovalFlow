import React, { useEffect, useState } from 'react';

// Semantic UI Imports
import { Loader, Tab, Menu, Label } from 'semantic-ui-react';

import {
  Link,
  Route,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

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
  //  Make it so when a user navigates to /projects/details it renders correctly

  // Query to fetch the current user data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useGetProject(+id);
  if (!data) {
    return <Loader />;
  } else {
    const panes: panes = [
      {
        menuItem: {
          content: <>Details</>,
          key: 'project-details',
        },
        render: () => (
          <Tab.Pane>
            <ProjectDetail project={data.project} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          content: <>Previous Workflows</>,
          key: 'project-previous',
        },
        render: () => (
          <Tab.Pane>
            <WorkflowRunList workflows={data.project.previous_runs} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          content: <>Submit for Approval</>,
          key: 'project-submit',
        },
        render: () => (
          <Tab.Pane>
            <ProjectSubmissionForm project={data.project} />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <TabContainer
        panes={panes}
        head={{
          content: `Project ${data?.project.name ?? ''}`,
          subHeader1:
            'Manage details about your project and see previous workflows.',
        }}
      />
    );
  }
};
export default ProjectPage;
