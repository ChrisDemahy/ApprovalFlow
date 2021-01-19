import axios from 'axios';
import type { AxiosError } from 'axios';
import type User from '../types/user';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';

export const postUser = (user: { email: string; password: string }) => {
  return client().post('/users/login', {
    user: user,
  });
};

export const getCurrentUser = () => {
  return client().get('/user');
};

// create axios object with propper settings

const client = () => {
  return axios.create({
    baseURL: 'localhost:3000/api/',
    // timeout: 1000,
    headers: {
      Authorization: `Token ${localStorage.token ? localStorage.token : ''}`,
    },
  });
};
