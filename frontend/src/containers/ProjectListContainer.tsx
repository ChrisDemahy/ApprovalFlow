import React, { useEffect, useState } from 'react';
import CardList, { itemArray } from '../components/CardList';
import { getAllProjects } from '../shared/api';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faLock } from '@fortawesome/free-solid-svg-icons';

import type Project from '../types/project';

const ProjectListContainer = () => {
  // React Query

  // Projects are returned under and array
  type projectData = Project[];

  // Query to fetch the current projects data.
  // TODO Refetch data on options:
  //  staleTime, refetchOnMount, refetchOnWindowFocus,
  //  refetchOnReconnect and refetchInterval.
  const { error, data, status, isFetching } = useQuery<projectData, Error>(
    'projects',
    getAllProjects,
  );

  return data ? (
    <>
      <Header as="h1" icon textAlign="center">
        <Icon circular>
          <FontAwesomeIcon
            style={{
              height: '40px',
              width: '40px',
            }}
            icon={faClipboard}
          />
        </Icon>
        Projects
      </Header>
      <CardList
        items={data.map((project: Project) => {
          return {
            header: project.name,
            meta: project.status,
            extra: (
              <Button fluid as={Link} to={`/projects/${project.id}`}>
                Open
              </Button>
            ),
          };
        })}
      />
      <Divider />
      <Button fluid as={Link} to={`/projectForm`}>
        New Project
      </Button>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ProjectListContainer;
