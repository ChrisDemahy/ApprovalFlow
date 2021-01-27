import axios from 'axios';
import type { AxiosError } from 'axios';
import type User from '../types/user';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';
import type Project from 'src/types/project';

const BASE_URL = 'http://localhost:3000/api';

export const loginUser = (user: { email: string; password: string }) => {
  return axios.post(`${BASE_URL}/users/login`, {
    user: user,
  });
};

export const postUser = (user: { email: string }) => {
  return client().put('/user', {
    user: user,
  });
};

export const postProject = (project: {
  name: string;
  total_cost: number;
  description: string;
}) => {
  return client().post('/projects', {
    project: project,
  });
};

export const putAuthorization = (authorization: {
  id: number;
  auth_status: string;
}) => {
  return client().put(`/authorizations/${authorization.id}`, {
    authorization: { status: authorization.auth_status },
  });
};

export const putProject = (project: {
  id: number;
  name: string;
  total_cost: number;
  description: string;
}) => {
  return client().put(`/projects/${project.id}`, {
    project: project,
  });
};

export const postWorkflowRun = ({
  name,
  description,
  id, // Project ID
}: {
  name: string;
  description: string;
  id: number;
}) => {
  const project_id = id;
  return client().post(`/workflow_runs/`, {
    workflow_run: { name, description, project_id },
  });
};

export const getProject = (id: number) => async () => {
  const { data } = await client().get(`/projects/${id}`);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await client().get('/user');
  return data;
};

export const getAllProjects = async () => {
  const { data } = await client().get('/projects');
  return data;
};

export const getAllNotifications = async () => {
  const { data } = await client().get('/notifications');
  return data;
};

export const getAllAuthorizations = async () => {
  const { data } = await client().get('/authorizations');
  return data;
};

export const getAllWorkflowRuns = async () => {
  const { data } = await client().get('/workflow_runs/');
  return data;
};

export const getWorkflowRun = (id: number) => async () => {
  const { data } = await client().get(`/workflow_runs/${id}`);
  return data;
};

// create axios object with propper settings

const client = () => {
  return axios.create({
    baseURL: `${BASE_URL}/`,
    // timeout: 1000,
    headers: {
      Authorization: `Token ${localStorage.token ? localStorage.token : ''}`,
    },
  });
};
