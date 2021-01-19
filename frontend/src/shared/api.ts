import axios from 'axios';
import type { AxiosError } from 'axios';
import type User from '../types/user';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';

export const loginUser = (user: { email: string; password: string }) => {
  return axios.post('http://localhost:3000/api/users/login', {
    user: user,
  });
};

export const getCurrentUser = async () => {
  const { data } = await client().get('/user');
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
