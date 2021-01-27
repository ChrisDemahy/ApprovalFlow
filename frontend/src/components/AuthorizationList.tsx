import React, { useState } from 'react';
import { Button, Divider, Header, Loader } from 'semantic-ui-react';
import type { ProjectData } from '../types/project';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import type User from '../types/user';
import type { AxiosError } from 'axios';

import {
  getAllAuthorizations,
  getProject,
  putAuthorization,
} from '../shared/api';
import CardList, { cardItem } from './CardList';
import type Authorization from '../types/authorization';
import type { AuthorizationData } from '../types/authorization';

const AuthorizationList = () => {
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

  const queryClient = useQueryClient();
  const id = '5';
  type Authorizations = Authorization[];
  const { error, data, status, isFetching } = useQuery<Authorizations, Error>(
    ['authorizations'],
    getAllAuthorizations,
  );
  console.log(data);
  return (
    <>
      {data ? (
        <>
          <Header as="h3" content="Notification" />
          <CardList
            items={data.map(
              (auth: Authorization): cardItem => {
                const new_card = {
                  header: auth.step ? auth.step.name : '',
                  description: auth.description ? auth.description : '',
                  meta: `${auth.status}`,
                  extra: (
                    <div className="ui two buttons">
                      <Button
                        basic
                        color="green"
                        onClick={(e) => {
                          e.preventDefault();

                          const authorization = {
                            id: auth.id,
                            auth_status: 'approved',
                          };
                          mutation.mutate(authorization);
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        basic
                        color="red"
                        onClick={(e) => {
                          e.preventDefault();

                          const authorization = {
                            id: auth.id,
                            auth_status: 'denied',
                          };
                          mutation.mutate(authorization);
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                  ),
                };
                return new_card;
              },
            )}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AuthorizationList;
