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
import type NotificationAlert from '../types/notification';
import type { ApprovalRequest } from '../types/notification';
import {
  getAllNotifications,
  getProject,
  putAuthorization,
} from '../shared/api';
import CardList, { cardItem } from './CardList';
import type Authorization from '../types/authorization';
import type { AuthorizationData } from '../types/authorization';

const ApprovalRequestList = () => {
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
  type ApprovalRequests = ApprovalRequest[];
  const { error, data, status, isFetching } = useQuery<ApprovalRequests, Error>(
    ['notifications'],
    getAllNotifications,
  );
  return (
    <>
      {data ? (
        <>
          <Header as="h3" content="Notification" />
          <CardList
            items={data.map(
              (alert: ApprovalRequest): cardItem => {
                const new_card = {
                  header: alert.name,
                  description: alert.content,
                  meta: `${alert.id}`,
                  extra: (
                    <div className="ui two buttons">
                      <Button
                        basic
                        color="green"
                        onClick={(e) => {
                          e.preventDefault();

                          const authorization = {
                            id: alert.authorization_id,
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
                            id: alert.authorization_id,
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

export default ApprovalRequestList;
