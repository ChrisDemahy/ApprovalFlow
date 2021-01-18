import axios from 'axios';
import type { AxiosError } from 'axios';
import type User from '../types/user';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';

type request = {
  status: string;
  data: any;
  error: AxiosError;
  isFetching: any;
};

export interface Token {
  token: string;
}

// Access the client
const queryClient = useQueryClient();

// Create hook to access Mutation
export const useLogin = () => {
  return useMutation('user', loginUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });
};

// Private Functions

const loginUser = async ({ email, password }: User): Promise<Token> => {
  const { data } = await axios.post('/login', {
    email: email,
    password: password,
  });
  return data;
};

// create axios object with propper settings

const createAuthenticatedInstance = ({ token }: { token: string }) => {
  const instance = axios.create({
    baseURL: 'localhost:3000/api/',
    // timeout: 1000,
    headers: { Authorization: `Token ${token}` },
  });
  return instance;
};
