export interface Organization {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  users: User[];
}

interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  organization_id: number;
  doa: number;
  supervisor_id: number;
  name: string;
}

export interface OrganizationData {
  organization: Organization;
}
