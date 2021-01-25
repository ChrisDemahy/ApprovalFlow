export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  organization_id?: number;
  DOA?: number;
}

export interface UserData {
  user: User;
}
export default User;
