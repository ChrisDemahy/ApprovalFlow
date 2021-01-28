import React, { Children } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faLock } from '@fortawesome/free-solid-svg-icons';

type Action = { type: 'OPEN' } | { type: 'CLOSE' };

function exampleReducer(state: { open: boolean }, action: Action) {
  switch (action.type) {
    case 'OPEN':
      return { open: true };
    case 'CLOSE':
      return { open: false };
  }
}

// ; dispatch: Dispatch<Action>;

export const ModalContext = React.createContext<{
  state: { open: boolean };
  dispatch: React.Dispatch<any>;
}>({
  state: { open: false },
  dispatch: () => null,
});

type Props = {
  children: JSX.Element;
};

function ApprovalModal({ children }: Props) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
  });

  const default_state = { state, dispatch };

  const { open } = state;

  // const { error, data, status, isFetching } = useQuery<ProjectData, Error>(
  //   ['project', +id],
  //   getProject(+id),
  // );

  return (
    <>
      <div>
        <Modal
          dimmer={'blurring'}
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
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </Modal.Content>

          <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: 'CLOSE' })}>
              Disagree
            </Button>
            <Button positive onClick={() => dispatch({ type: 'CLOSE' })}>
              Agree
            </Button>
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
