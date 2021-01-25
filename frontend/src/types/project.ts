import type User from './user';
import type { Workflowrun } from './workflowrun';

export interface Project {
  id: number;
  user?: User;
  name: string;
  status: string;
  total_cost: number;
  workflow_run?: Workflowrun;
  workflow_template?: Workflowtemplate;
  description: string;
  created_at: string;
  updated_at: string;
  url: string;
  previous_runs: Workflowrun[];
}

export interface ProjectData {
  project: Project;
}
export default Project;
