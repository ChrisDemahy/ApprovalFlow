import React, { SyntheticEvent, useState } from 'react';
import { Dropdown, DropdownProps, Loader } from 'semantic-ui-react';
import type Project from 'src/types/project';
import { useQuery } from 'react-query';
import { getAllOrganizations } from '../shared/api';

type projectData = Project[];

const OrganizationOptions = ({
  setOrganization,
  organization,
}: {
  organization: number;
  setOrganization: any;
}) => {
  const { error, data, status, isFetching } = useQuery<projectData, Error>(
    'organizations',
    getAllOrganizations,
  );
  const handleChange = (
    event: SyntheticEvent<HTMLElement, Event>,
    some_data: DropdownProps,
  ) => setOrganization(some_data.value);
  if (!data) {
    return <Loader />;
  } else {
    const options: { key: string; text: string; value: number }[] = data.map(
      (org) => {
        return {
          key: org.name,
          text: org.name,
          value: org.id,
        };
      },
    );
    return (
      <>
        <Dropdown
          button
          onChange={handleChange}
          fluid
          options={options}
          search
          value={organization === 0 ? '' : organization}
          placeholder="Select Organization"
        />
      </>
    );
  }
};

export default OrganizationOptions;
