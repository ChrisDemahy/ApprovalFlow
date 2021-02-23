import axios from 'axios';
import type { AxiosError } from 'axios';
import type User from '../types/user';
import type { UserData } from '../types/user';
import History, { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  UseQueryOptions,
} from 'react-query';
import type Project from 'src/types/project';
import type { ProjectData } from 'src/types/project';
import type { Organization, OrganizationData } from 'src/types/organization';
import type Authorization from 'src/types/authorization';
import type Workflowrun from 'src/types/workflowrun';
import type { WorkflowRunData } from 'src/types/workflowrun';
import { useState } from 'react';
import type { AuthorizationData } from 'src/types/authorization';

const BASE_URL = 'http://localhost:3000/api';

// **** Put User **** //
export const useLoginUser = () => {
  interface userData {
    email: string;
    password: string;
  }

  const loginUser = (user: userData) => {
    return axios.post(`${BASE_URL}/users/login`, {
      user: user,
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  // To navigate to another page on finishing of request
  const history = useHistory();
  // Id of the workflow_run
  const id = useParams();

  const [apiError, setApiError] = useState(['']);
  const mutation = useMutation(loginUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      const { user, token }: { user: User; token: string } = res.data;
      // TODO Set user query data from here
      localStorage.token = token;
      queryClient.invalidateQueries('currentUser');
      // Go to next page or show error
      history.push('/projects');
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });
  return { mutation, apiError };
};

// **** Put User **** //
export const usePutUser = () => {
  interface userData {
    email: string;
  }

  const client = useClient();
  const putUser = (user: userData) => {
    return client.put('/user', {
      user: user,
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  // To navigate to another page on finishing of request
  const history = useHistory();
  // Id of the workflow_run
  const id = useParams();

  const [apiError, setApiError] = useState(['']);
  const mutation = useMutation(putUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      // Go to next page or show error
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });
  return { mutation, apiError };
};

// **** Post Project **** //
export const usePostUser = () => {
  interface userData {
    email: string;
    password: string;
    organization_id: number;
    doa: number;
    name: string;
    supervisor_id: number;
  }
  const postUser = (user: userData) => {
    const a_user = {
      email: user.email,
      password: user.password,
      organization_id: user.organization_id,
      doa: user.doa,
      name: user.name,
      supervisor_id: user.supervisor_id,
    };
    return axios.post(`${BASE_URL}/users/`, {
      user: a_user,
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  // To navigate to another page on finishing of request
  const history = useHistory();
  // Id of the workflow_run
  const id = useParams();

  const [apiError, setApiError] = useState(['']);
  const mutation = useMutation(postUser, {
    onSuccess: (res) => {
      // Invalidate and refetch
      const { user, token }: { user: User; token: string } = res.data;
      // TODO Set user query data from here
      localStorage.token = token;
      queryClient.invalidateQueries('currentUser');
      // Go to next page or show error
      history.push('/login');
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });

  return { mutation, apiError };
};

// **** Post Project **** //
export const usePostProject = () => {
  interface ProjectData {
    name: string;
    total_cost: number;
    description: string;
  }
  const client = useClient();
  const postProject = (project: ProjectData) => {
    return client.post('/projects', {
      project: project,
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  // To navigate to another page on finishing of request
  const history = useHistory();
  // Id of the workflow_run
  const id = useParams();
  const [apiError, setApiError] = useState(['']);
  const mutation = useMutation(postProject, {
    onSuccess: (res) => {
      // const project = data.project;

      // Invalidate and refetch
      queryClient.invalidateQueries('projects');
      // Go to next page or show error
      console.log(res.data.project);
      history.push(`/projects/${res.data.project.id}`);
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });

  return { mutation, apiError };
};

// **** Put Authorization **** //
export const usePutAuthorization = () => {
  interface authData {
    id: number;
    auth_status: string;
  }
  const client = useClient();
  const putAuthorization = (authorization: authData) => {
    return client.put(`/authorizations/${authorization.id}`, {
      authorization: { status: authorization.auth_status },
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  // To navigate to another page on finishing of request
  const history = useHistory();
  // Id of the workflow_run
  const id = useParams();
  const [apiError, setApiError] = useState(['']);
  const mutation = useMutation(putAuthorization, {
    onSuccess: ({ data }: { data: AuthorizationData }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['notifications']);

      // Get The id of the new workflow_run
      // Go to next page or show error
      // history.push(`/workflow_runs/${data.workflow_run.id}`);
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });

  return { mutation, apiError };
};

// **** Put Project **** //
export const usePutProject = () => {
  interface projectData {
    id: number;
    name: string;
    total_cost: number;
    description: string;
  }

  const client = useClient();
  const putProject = (project: projectData) => {
    return client.put(`/projects/${project.id}`, {
      project: project,
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();
  // To navigate to another page on finishing of request
  const history = useHistory();
  // Id of the workflow_run
  const id = useParams();
  const [apiError, setApiError] = useState(['']);
  const mutation = useMutation(putProject, {
    onSuccess: ({ data }: { data: ProjectData }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['project', +id]);

      // Get The id of the new workflow_run
      // Go to next page or show error
      // history.push(`/workflow_runs/${data.workflow_run.id}`);
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });
  return { mutation, apiError };
};

// **** Post Workflow **** //
export const usePostWorkflowRun = () => {
  // Type
  interface postData {
    name: string;
    description: string;
    id: number;
  }
  // Axios Function
  const client = useClient();
  const postWorkflowRun = ({
    name,
    description,
    id, // Project ID
  }: postData) => {
    const project_id = id;
    return client.post(`/workflow_runs/`, {
      workflow_run: { name, description, project_id },
    });
  };

  // Setup React Query for fetching and posting data
  const queryClient = useQueryClient();

  // To navigate to another page on finishing of request
  const history = useHistory();

  // Id of the workflow_run
  const id = useParams();
  // Api Error State
  const [apiError, setApiError] = useState(['']);

  const mutation = useMutation(postWorkflowRun, {
    onSuccess: ({ data }: { data: WorkflowRunData }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['workflow_run', +id]);

      // Get The id of the new workflow_run
      // Go to next page or show error
      history.push(`/workflow/${data.workflow_run.id}`);
    },
    onError: (error: AxiosError, variables, context) => {
      // If the error is from the form, the server sent it in the response
      // Otherwise set a default error message (probably internal server error?)
      if (error.response) {
        // Each key is the field where the error occured
        //  and the value is the error message
        const errorObject = error.response.data.errors;
        const errorArray = Object.keys(errorObject).map(function (key, index) {
          return `${key}: ${errorObject[key][0]}`;
        });

        // TODO Show proper error message for internal server error
        setApiError(errorArray);
      } else {
        setApiError(['Internal Error']);
      }
    },
  });
  return { mutation, apiError };
};

// QUERIES //

// **** Single Project **** //
export function useGetProject(
  id: number,
  options?: UseQueryOptions<ProjectData, Error, ProjectData>,
) {
  // Get Project Axios Function
  const client = useClient();
  const getProject = (id: number) => async (): Promise<ProjectData> => {
    const { data } = await client.get(`/projects/${id}`);
    return data;
  };
  // React Query Hook
  return useQuery<ProjectData, Error>(
    ['project', +id],
    getProject(+id),
    options,
  );
}

// **** Single Organization **** //
export function useGetOrganization<TData = Organization>(
  id: number,
  options?: UseQueryOptions<Organization, Error, Organization>,
) {
  // Get Organization Axios Function
  const client = useClient();
  const getOrganization = (id: number) => async (): Promise<Organization> => {
    const { data } = await client.get(`/organizations/${id}`);
    return data;
  };
  // Get Organization React Query Hook
  return useQuery<Organization, Error>(
    ['project', +id],
    getOrganization(+id),
    options,
  );
}

// **** Get Current User **** //
export function useGetCurrentUser(
  options?: UseQueryOptions<UserData, Error, UserData>,
) {
  // Axios Function
  const client = useClient();
  const getCurrentUser = async (): Promise<UserData> => {
    const { data } = await client.get('/user');
    return data;
  };
  // React Query Hook
  return useQuery<UserData, Error>(['currentUser'], getCurrentUser, options);
}

// **** All Projects **** //
type allProjects = Project[];
export function useGetProjects(
  options?: UseQueryOptions<allProjects, Error, allProjects>,
) {
  // Get all projects Axios Function
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  const client = useClient();
  //  refetchOnReconnect and refetchInterval.
  const getAllProjects = async (): Promise<allProjects> => {
    const { data } = await client.get('/projects');
    console.log(data);
    return data;
  };
  // Get Project React Query Hook
  return useQuery<allProjects, Error>(['projects'], getAllProjects, options);
}

// **** All Organizations **** //
type allOrganizations = Organization[];
export function useGetOrganizations<TData = allOrganizations>(
  options?: UseQueryOptions<allOrganizations, AxiosError, TData>,
) {
  // Axios Function
  const getAllOrganizations = async (): Promise<allOrganizations> => {
    const { data } = await axios.get(`${BASE_URL}/organizations/`);
    return data;
  };
  // React Query Hook
  return useQuery<allOrganizations, Error>(['projects'], getAllOrganizations);
}

// **** All Authorizations **** //
type allAuthorizations = Authorization[];
export function useGetAuthorizations(
  options?: UseQueryOptions<allAuthorizations, Error, allAuthorizations>,
) {
  // Axios Function
  const client = useClient();
  const getAllAuthorizations = async (): Promise<allAuthorizations> => {
    const { data } = await client.get('/authorizations');
    return data;
  };
  // React Query
  return useQuery<allAuthorizations, Error>(
    ['projects'],
    getAllAuthorizations,
    options,
  );
}

// **** All WorkflowRuns **** //
type allWorkflowRuns = Workflowrun[];
export function useGetWorkflowRuns(
  options?: UseQueryOptions<allWorkflowRuns, Error, allWorkflowRuns>,
) {
  // Axios Function
  const client = useClient();
  const getAllWorkflowRuns = async (): Promise<allWorkflowRuns> => {
    const { data } = await client.get('/workflow_runs/');
    return data;
  };
  // React Query Hook
  return useQuery<allWorkflowRuns, Error>(
    ['projects'],
    getAllWorkflowRuns,
    options,
  );
}

// **** Single Worklfow Run **** //
export function useGetWorkflowRun<TData = WorkflowRunData>(
  id: number,
  options?: UseQueryOptions<WorkflowRunData, AxiosError, TData>,
) {
  // Axios Function
  const client = useClient();
  const getWorkflowRun = (id: number) => async (): Promise<WorkflowRunData> => {
    const { data } = await client.get(`/workflow_runs/${id}`);
    return data;
  };
  // React Query Hook
  return useQuery<WorkflowRunData, Error>(['projects'], getWorkflowRun(id));
}

// create axios object with propper settings

const useClient = () => {
  const history = useHistory();
  const newClient = axios.create({
    baseURL: `${BASE_URL}/`,
    // timeout: 1000,
    headers: {
      Authorization: `Token ${localStorage.token ? localStorage.token : ''}`,
    },
  });
  newClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        history.push('/login');
      }
      return error;
    },
  );
  return newClient;
};
