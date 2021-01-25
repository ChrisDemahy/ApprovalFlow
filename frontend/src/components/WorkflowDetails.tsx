import React from 'react';
import { Button, Divider, Header } from 'semantic-ui-react';

import type { WorkflowRunData } from 'src/types/workflowrun';

const WorkflowDetails = ({ workflow_run }: WorkflowRunData) => {
  return (
    <>
      {/* <Header as="h3" content="Project Details" /> */}

      <Header as="h5" content="Name" />
      {workflow_run.name}
      <Header as="h5" content="Description" />
      {workflow_run.description}
      <Header as="h5" content="Status" />
      {workflow_run.status}
    </>
  );
};

export default WorkflowDetails;
