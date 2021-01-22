interface Workflowrun {
  id: number;
  name: string;
  description?: any;
  created_at: string;
  updated_at: string;
  first_step_id: number;
  current_step_id: number;
  last_step_id: number;
  project_id: number;
}
