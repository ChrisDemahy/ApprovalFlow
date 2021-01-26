import React, { Component, useState } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const DashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <Menu style={{ height: '100%', marginTop: '3em' }} fixed="left" vertical>
      <Menu.Item>
        <Input placeholder="Search..." />
      </Menu.Item>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>
      <Menu.Item
        name="projects"
        active={activeItem === 'projects'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={Link}
        to="/projects"
      >
        Projects
      </Menu.Item>
      <Menu.Item
        name="Workflows"
        active={activeItem === 'Workflows'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={Link}
        to="/workflow_runs"
      >
        Workflows
      </Menu.Item>
      <Menu.Item
        name="notifications"
        active={activeItem === 'notifications'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
        as={Link}
        to="/notifications"
      >
        Notifications
      </Menu.Item>

      <Dropdown item text="More">
        <Dropdown.Menu>
          <Dropdown.Item icon="edit" text="Edit Profile">
            <FontAwesomeIcon
              style={{
                height: '20px',
                width: '20px',
              }}
              icon={faEnvelope}
            />{' '}
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item icon="globe" text="Choose Language" />
          <Dropdown.Item icon="settings" text="Account Settings" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default DashboardSidebar;
