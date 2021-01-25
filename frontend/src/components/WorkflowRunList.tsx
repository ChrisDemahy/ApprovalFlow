import React from 'react';
import { List, Image } from 'semantic-ui-react';
import type { Workflowrun } from 'src/types/workflowrun';

const ListExampleAnimated = (workflows: Workflowrun[]) => {
  return (
    <List animated verticalAlign="middle">
      <List.Item>
        <Image avatar src="../../public/alert-triangle.svg" />
        <List.Content>
          <List.Header>Christian</List.Header>
        </List.Content>
      </List.Item>
    </List>
  );
};
