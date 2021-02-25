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
  const match = useRouteMatch(`/project/${+id}/:slug`);
  // if (match === null ) {  return <Redirect from='/'  }
  const [index, setIndex] = useState(0);
  useEffect(() => {
    console.log('use effect running');
    if (match) {
      console.log('match is not null, setting index on match');
      switch (match.url) {
        case `/project/${+id}/details`:
          setIndex(0);
          break;
        case `/project/${+id}/previous`:
          setIndex(1);
          break;
        case `/project/${+id}/submit`:
          setIndex(2);
          break;
      }
    }
  }, [match]);

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
          as: Link,
          content: <>Details</>,
          to: `/project/${+id}/details`,
          exact: true,
          key: 'project-details',
        },
        render: () => (
          <>
            {console.log(match)}
            <Route
              path={`/project/${+id}/details`}
              exact
              key="project-details-pane"
            >
              <Tab.Pane>
                <ProjectDetail project={data.project} />
              </Tab.Pane>
            </Route>
          </>
        ),
      },
      {
        menuItem: {
          as: Link,
          content: <>Previous Workflows</>,
          to: `/project/${+id}/previous`,
          exact: true,
          key: 'project-previous',
        },
        render: () => (
          <Route
            path={`/project/${+id}/previous`}
            exact
            key="project-previous-pane"
          >
            <Tab.Pane>
              <WorkflowRunList workflows={data.project.previous_runs} />
            </Tab.Pane>
          </Route>
        ),
      },
      {
        menuItem: {
          as: Link,
          content: <>Submit for Approval</>,
          to: `/project/${+id}/submit`,
          exact: true,
          key: 'project-submit',
        },
        render: () => (
          <Route
            path={`/project/${+id}/submit`}
            exact
            key="project-submit-pane"
          >
            <Tab.Pane>
              <ProjectSubmissionForm project={data.project} />
            </Tab.Pane>
          </Route>
        ),
      },
    ];

    return (
      <>
        {console.log(` Tab index is ${index}`)}
        <TabContainer
          panes={panes}
          activeIndex={index}
          head={{
            content: `Project ${data?.project.name ?? ''}`,
            subHeader1:
              'Manage details about your project and see previous workflows.',
          }}
        />
      </>
    );
  }
};
export default ProjectPage;
