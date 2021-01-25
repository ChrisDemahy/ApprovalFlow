export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  created_at: string;
  updated_at: string;
  organization_id?: number;
  DOA?: number;
  supervisor_id: number;
}

export interface UserData {
  user: User;
}
export default User;
