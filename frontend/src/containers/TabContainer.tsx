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
const TabContainer = ({
  panes,
  head,
  activeIndex,
}: {
  panes: panes;
  head: header;
  activeIndex?: number;
}) => (
  <>
    <Header
      as="h2"
      content={head.content}
      subheader={[
        <div key={head.subHeader1}>{head.subHeader1}</div>,
        <br key={`${head.subHeader1} break`} />,
        <div key={head.subHeader2}>{head.subHeader2 ?? ''}</div>,
      ]}
    />

    {activeIndex ? (
      <Tab activeIndex={activeIndex} panes={[...panes]} />
    ) : (
      <Tab panes={[...panes]} />
    )}
  </>
);

export default TabContainer;
