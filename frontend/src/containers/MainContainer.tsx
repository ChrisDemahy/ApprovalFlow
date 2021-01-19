import React from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import DashboardSidebar from '../components/DashboardSidebar';

type Props = {
  children: JSX.Element;
};

const MainContainer = ({ children }: Props) => (
  <div>
    <DashboardSidebar />
    <NavBar />
    <div style={{ marginTop: '3em', marginLeft: '15em' }}>{children}</div>
  </div>
);

export default MainContainer;
