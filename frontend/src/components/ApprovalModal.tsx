import React, { Children, useEffect, useState } from 'react';
import { Button, Loader, Modal } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { ProjectData } from '../types/project';
import {
  useGetProject,
  usePutAuthorization,
  usePutProject,
} from '../shared/api';
import ProjectDetail from './ProjectDetails';
import type { AuthorizationData } from '../types/authorization';
import type { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

type Action =
  | { type: 'OPEN'; project_id: number; authorization_id: number }
  | { type: 'CLOSE' };

// Reducer for UseReduce
function modalReducer(
  state: { project_id: number; open: boolean; authorization_id: number },
  action: Action,
) {
  switch (action.type) {
    case 'OPEN':
      return {
        project_id: action.project_id,
        open: true,
        authorization_id: action.authorization_id,
      };
    case 'CLOSE':
      return { project_id: 0, open: false, authorization_id: 0 };
  }
}

const default_global_state = {
  project_id: 0,
  open: false,
  authorization_id: 0,
};

// Create the context used to propogate the state and dipatch functions
export const ModalContext = React.createContext<{
  state: { project_id: number; open: boolean };
  dispatch: React.Dispatch<any>;
}>({
  state: default_global_state,
  dispatch: () => null,
});

type Props = {
  children: JSX.Element;
};

function ApprovalModal({ children }: Props) {
  // Setup useReducer
  const [state, dispatch] = React.useReducer(
    modalReducer,
    default_global_state,
  );
  useEffect(() => {
    console.log('rendered Modal');
  }, []);

  // Default state provided in the context provider
  const default_state = { state, dispatch };

  // Hold if there are any errors with the api/backend

  // Actual state data provided by the context
  const { open, project_id, authorization_id } = state;

  // Query to fetch Data
  const { data } = useGetProject(project_id, {
    // The query will not execute until the userId exists
    enabled: project_id !== 0,
  });

  // Mutation to post the approval or denial
  const { mutation, apiError } = usePutAuthorization();
  const history = useHistory();
  return (
    <>
      <div>
        <Modal
          // dimmer={'blurring'}
          open={open}
          onClose={() => dispatch({ type: 'CLOSE' })}
        >
          <Modal.Header>
            <FontAwesomeIcon
              style={{
                height: '20px',
                width: '20px',
              }}
              icon={faExclamationCircle}
            />
            <span style={{ marginLeft: '0.5em' }}>Approval Details</span>
          </Modal.Header>
          <Modal.Content>
            {!data ? <Loader /> : <ProjectDetail project={data.project} />}
          </Modal.Content>

          <Modal.Actions>
            <Button.Group widths="3">
              <Button
                primary
                onClick={(e) => {
                  e.preventDefault();

                  dispatch({ type: 'CLOSE' });
                  history.push(`/projects/${data?.project.id}`);
                }}
              >
                Open Project
              </Button>

              <Button
                positive
                onClick={(e) => {
                  e.preventDefault();

                  const authorization = {
                    id: authorization_id,
                    auth_status: 'approved',
                  };
                  mutation.mutate(authorization);
                  dispatch({ type: 'CLOSE' });
                  history.push(`/projects/${data?.project.id}`);
                }}
              >
                Approve
              </Button>
              {/* <Button.Or /> */}
              <Button
                negative
                onClick={(e) => {
                  e.preventDefault();

                  const authorization = {
                    id: authorization_id,
                    auth_status: 'denied',
                  };
                  mutation.mutate(authorization);
                  dispatch({ type: 'CLOSE' });
                  history.push(`/projects/${data?.project.id}`);
                }}
              >
                Deny
              </Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>
      </div>
      <ModalContext.Provider value={default_state}>
        {children}
      </ModalContext.Provider>
    </>
  );
}

export default ApprovalModal;
