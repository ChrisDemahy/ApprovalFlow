export interface Project {
  id: number;
  user_id: number;
  name: string;
  status: string;
  total_cost: number;
  workflow_run?: Workflowrun;
  workflow_template?: Workflowtemplate;
  description: string;
  created_at: string;
  updated_at: string;
  url: string;
}
export default Project;
