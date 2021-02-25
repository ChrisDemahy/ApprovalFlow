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
}
const TabContainer = ({
  panes,
  head,
  activeIndex,
  defaultActiveIndex,
}: {
  panes: panes;
  head: header;
  activeIndex?: number;
  defaultActiveIndex?: number;
}) => (
  <>
    <Header as="h2" content={head.content} subheader={head.subHeader1} />

    {activeIndex ? (
      <Tab activeIndex={activeIndex} panes={[...panes]} />
    ) : (
      <Tab panes={[...panes]} />
    )}
  </>
);

export default TabContainer;
