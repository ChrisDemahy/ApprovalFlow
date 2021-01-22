export interface Step {
  id: number;
  name: string;
  status: string;
  description?: any;
  created_at: Date;
  updated_at: Date;
  next_step_id?: number;
  email: string;
  organization_id: number;
  DOA: number;
}
export default Step;
