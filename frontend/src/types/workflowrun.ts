export interface Workflowrun {
  id: number;
  name: string;
  description?: any;
  status: string;
  created_at: Date;
  updated_at: Date;
  project_id: number;
  current_step_id: number;
  last_step_id: number;
}
