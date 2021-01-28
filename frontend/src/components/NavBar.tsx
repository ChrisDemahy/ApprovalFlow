import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
  const history = useHistory();
  return (
    <>
      <Menu fixed="top" inverted>
        <Menu.Item as="a" header>
          <FontAwesomeIcon
            style={{
              height: '20px',
              width: '20px',
            }}
            icon={faStream}
          />
          <span style={{ marginLeft: '0.5em', marginRight: '4.3em' }}>
            Approval Flow
          </span>
        </Menu.Item>
        <Menu.Item as={Link} to="/projects">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/projects">
          Help
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.token = '';
            history.push('/login');
          }}
        >
          Log Out
        </Menu.Item>

        {/* <Dropdown item simple text="dropdown">
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className="dropdown icon" />
              <span className="text">Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </Menu>
    </>
  );
};

export default NavBar;
