import React from 'react';

// Imports for fetching data
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import axios from 'axios';
import { getCurrentUser } from 'src/shared/api';

const UserProfile = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { error, data, status, isFetching } = useQuery('user', getCurrentUser);

  return <div>{}</div>;
};
