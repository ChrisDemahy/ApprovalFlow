import React from 'react';
import { Button, Divider, Header } from 'semantic-ui-react';
import type { ProjectData } from '../types/project';

const ProjectDetail = ({ project }: ProjectData) => {
  return (
    <>
      {/* <Header as="h3" content="Project Details" /> */}

      <Header as="h5" content="Name" />
      {project.name}
      <Header as="h5" content="Description" />
      {project.description}
      <Header as="h5" content="Total Cost" />
      {project.total_cost}
      <Header as="h5" content="Status" />
      {project.status}
    </>
  );
};

export default ProjectDetail;
