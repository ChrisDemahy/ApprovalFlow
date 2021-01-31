import React, { SyntheticEvent, useState } from 'react';
import { Dropdown, DropdownProps, Loader } from 'semantic-ui-react';
import type Project from 'src/types/project';
import { useQuery } from 'react-query';
import { getAllOrganizations } from '../shared/api';
import type { Organization } from 'src/types/organization';

type projectData = Organization[];

const OrganizationOptions = ({
  setOrganization,
  organization,
  supervisor,
  setSupervisor,
}: {
  organization: number;
  setOrganization: any;
  supervisor: number;
  setSupervisor: any;
}) => {
  const { error, data, status, isFetching } = useQuery<projectData, Error>(
    'organizations',
    getAllOrganizations,
  );
  const handleChange = (
    event: SyntheticEvent<HTMLElement, Event>,
    some_data: DropdownProps,
  ) => setOrganization(some_data.value);

  const handleSupervisor = (
    event: SyntheticEvent<HTMLElement, Event>,
    some_data: DropdownProps,
  ) => setSupervisor(some_data.value);

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
    const userOptions: {
      key: string;
      text: string;
      value: number;
    }[] = data[0].users.map((user) => {
      return {
        key: user.name,
        text: user.name,
        value: user.id,
      };
    });
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
        <br />
        <Dropdown
          button
          onChange={handleSupervisor}
          fluid
          options={userOptions}
          search
          value={supervisor === 0 ? '' : supervisor}
          placeholder="Select Supervisor"
        />
      </>
    );
  }
};

export default OrganizationOptions;
