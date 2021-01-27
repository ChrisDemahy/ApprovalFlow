import type Authorization from './authorization';
import type User from './user';

export interface Step {
  id: number;
  name: string;
  status: string;
  description?: any;
  created_at: string;
  updated_at: string;
  next_step_id?: number;
  workflow_run_id?: number;
  user: User;
  authorization?: Authorization;
}

export interface StepData {
  step: Step;
}
export default Step;
