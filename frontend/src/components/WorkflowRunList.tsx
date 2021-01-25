import React from 'react';
import { List, Image } from 'semantic-ui-react';
import type { Workflowrun } from 'src/types/workflowrun';

const ListExampleAnimated = (workflows: Workflowrun[]) => {
  return (
    <List animated verticalAlign="middle">
      {workflows.map((workflow) => (
        <List.Item>
          {console.log(workflow)}
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header as="a">Daniel Louise</List.Header>
            <List.Description>
              Last waiting for
              <a>
                <b>user</b>
              </a>
              to approve yesterday just now.
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
