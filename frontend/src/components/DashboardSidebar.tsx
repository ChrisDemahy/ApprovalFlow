import React, { Component, useState } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const DashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <Menu style={{ height: '100%', marginTop: '3em' }} fixed="left" vertical>
      <Menu.Item>
        <Input placeholder="Search..." />
      </Menu.Item>
      {/* <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={NavLink}
        to="/"
      >
        Home
      </Menu.Item> */}
      <Menu.Item
        name="projects"
        active={activeItem === 'projects'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={NavLink}
        to="/projects/active"
      >
        Projects
      </Menu.Item>
      <Menu.Item
        name="approvals"
        active={activeItem === 'approvals'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={NavLink}
        to="/approvals"
      >
        Approvals
      </Menu.Item>
      <Menu.Item
        name="Workflows"
        active={activeItem === 'Workflows'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={NavLink}
        to="/workflow_runs"
      >
        Workflows
      </Menu.Item>

      <Menu.Item
        name="Organization"
        active={activeItem === 'Organization'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={NavLink}
        to="/organization "
      >
        Organization
      </Menu.Item>
    </Menu>
  );
};

export default DashboardSidebar;
