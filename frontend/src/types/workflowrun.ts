import type Step from './step';

export interface Workflowrun {
  id: number;
  name: string;
  description?: any;
  status: string;
  created_at: string;
  updated_at: string;
  project_id: number;
  current_step_id: number;
  last_step_id: number;
  steps: Step[];
}

export interface WorkflowRunData {
  workflow_run: Workflowrun;
}
