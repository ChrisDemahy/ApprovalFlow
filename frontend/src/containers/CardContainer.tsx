import React from 'react';
import { Card } from 'semantic-ui-react';

interface item {
  header: string;
  description?: string;
  meta?: string;
  image?: string;
  extra?: JSX.Element;
}
type itemArray = item[];

const CardContainer = ({ items }: { items: itemArray }) => (
  <Card.Group items={items} />
);

export default CardContainer;
