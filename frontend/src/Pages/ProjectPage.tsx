import React from 'react';

import type Project from '../types/project';
import ProjectDetail from '../components/ProjectDetail';
import StepTable from '../components/StepTable';

interface projectData {
  project: Project;
}

const ProjectPage = () => {
  return (
    <>
      <ProjectDetail />
      {/* <StepTable /> */}
    </>
  );
};
export default ProjectPage;
