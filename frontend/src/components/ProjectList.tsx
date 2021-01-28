import React from 'react';

import { Loader, List, Image, Table, Header, Button } from 'semantic-ui-react';
import type Project from '../types/project';
import { useHistory } from 'react-router-dom';

const ProjectList = ({ data }: { data: Project[] }) => {
  const history = useHistory();
  const formatDate = (date_string: string) => {
    const d = Date.parse(date_string);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  };
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Cost</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>

          <Table.HeaderCell>Date Started</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((project) => (
          <Table.Row
            onClick={(e: any) => {
              history.push(`/projects/${project.id}`);
            }}
            key={project.id}
          >
            <Table.Cell>
              <Header as="h4">{project.name}</Header>
            </Table.Cell>
            <Table.Cell>{project.total_cost}</Table.Cell>
            <Table.Cell>
              {project.status === 'pending_approval'
                ? 'pending'
                : project.status}
            </Table.Cell>
            <Table.Cell>{formatDate(project.created_at)}</Table.Cell>
            <Table.Cell>
              <Button basic>Open</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProjectList;
