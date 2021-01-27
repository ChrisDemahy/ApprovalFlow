import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

type Action = { type: 'OPEN' } | { type: 'CLOSE' };

function exampleReducer(state: { open: boolean }, action: Action) {
  switch (action.type) {
    case 'OPEN':
      return { open: true };
    case 'CLOSE':
      return { open: false };
  }
}

function ApprovalModal() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
  });
  const { open } = state;

  return (
    <div>
      <Button onClick={() => dispatch({ type: 'OPEN' })}>Blurring</Button>

      <Modal
        dimmer={'blurring'}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE' })}
      >
        <Modal.Header>Use Google's location service?</Modal.Header>
        <Modal.Content>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
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
  );
}

export default ApprovalModal;
