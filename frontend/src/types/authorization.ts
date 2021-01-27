import type Step from './step';

export interface Authorization {
  id: number;
  user_id: number;
  step_id: number;
  status: string;
  description?: any;
  created_at: string;
  updated_at: string;
  step?: Step;
}
export default Authorization;

export interface AuthorizationData {
  authorization: Authorization;
}
