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

export const loginUser = (user: { email: string; password: string }) => {
  return axios.post('http://localhost:3000/api/users/login', {
    user: user,
  });
};

export const getCurrentUser = async () => {
  const { data } = await client().get('/user');
  return data;
};

export const postUser = (user: { email: string }) => {
  return client().put('http://localhost:3000/api/user', {
    user: user,
  });
};

export const postProject = (project: {
  name: string;
  total_cost: number;
  description: string;
}) => {
  return client().post('http://localhost:3000/api/projects', {
    project: project,
  });
};

export const putProject = (project: {
  name: string;
  total_cost: number;
  description: string;
}) => {
  return client().put('http://localhost:3000/api/projects', {
    project: project,
  });
};

export const submitProject = (project: {
  name: string;
  total_cost: number;
  description: string;
  workflow_template_id: 1;
}) => {
  return client().put('http://localhost:3000/api/projects', {
    project: project,
  });
};

export const getProject = (id: number) => async () => {
  const { data } = await client().get(`/projects/${id}`);
  return data;
};

export const getAllProjects = async () => {
  const { data } = await client().get('/projects');
  return data;
};

// create axios object with propper settings

const client = () => {
  return axios.create({
    baseURL: 'http://localhost:3000/api/',
    // timeout: 1000,
    headers: {
      Authorization: `Token ${localStorage.token ? localStorage.token : ''}`,
    },
  });
};
