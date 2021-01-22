export interface Step {
  id: number;
  name: string;
  status: string;
  description?: any;
  created_at: Date;
  updated_at: Date;
  url: string;
}
