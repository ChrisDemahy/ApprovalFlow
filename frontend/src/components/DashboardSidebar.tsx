import React, { Component, useState } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';

const DashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <Menu style={{ height: '100%', marginTop: '3em' }} fixed="left" vertical>
      <Menu.Item>
        <Input placeholder="Search..." />
      </Menu.Item>

      <Menu.Item>
        Home
        <Menu.Menu>
          <Menu.Item
            name="search"
            active={activeItem === 'search'}
            onClick={(e, { name }) => {
              name && setActiveItem(name);
            }}
          >
            Search
          </Menu.Item>
          <Menu.Item
            name="add"
            active={activeItem === 'add'}
            onClick={(e, { name }) => {
              name && setActiveItem(name);
            }}
          >
            Add
          </Menu.Item>
          <Menu.Item
            name="about"
            active={activeItem === 'about'}
            onClick={(e, { name }) => {
              name && setActiveItem(name);
            }}
          >
            Remove
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item
        name="browse"
        active={activeItem === 'browse'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
      >
        <Icon name="grid layout" />
        Browse
      </Menu.Item>
      <Menu.Item
        name="messages"
        active={activeItem === 'messages'}
        onClick={(e, { name }) => {
          name && setActiveItem(name);
        }}
      >
        Messages
      </Menu.Item>

      <Dropdown item text="More">
        <Dropdown.Menu>
          <Dropdown.Item icon="edit" text="Edit Profile" />
          <Dropdown.Item icon="globe" text="Choose Language" />
          <Dropdown.Item icon="settings" text="Account Settings" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default DashboardSidebar;
