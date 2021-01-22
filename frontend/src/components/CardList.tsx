import React from 'react';
import { Card } from 'semantic-ui-react';

interface cardItem {
  header: string;
  description?: string;
  meta?: string;
  image?: string;
  extra?: JSX.Element;
}
export type itemArray = cardItem[];

const CardList = ({ items }: { items: itemArray }) => (
  <Card.Group items={items} />
);

export default CardList;
