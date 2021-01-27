import React from 'react';
import { Header, Tab, TabPaneProps } from 'semantic-ui-react';
import type { SemanticShorthandItem } from 'semantic-ui-react/dist/commonjs/generic';

export interface pane {
  pane?: SemanticShorthandItem<TabPaneProps>;
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
}
export type panes = pane[];

export interface header {
  content: string;
  subHeader1: string;
  subHeader2?: string;
}
const TabContainer = ({ panes, head }: { panes: panes; head: header }) => (
  <>
    <Header
      as="h2"
      content={head.content}
      subheader={[
        head.subHeader1,
        <br />,
        head.subHeader2 ? head.subHeader2 : '',
      ]}
    />

    <Tab panes={[...panes]} />
  </>
);

export default TabContainer;
