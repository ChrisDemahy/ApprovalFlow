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
    <Container text style={{ marginTop: '7em' }}>
      {children}
    </Container>
  </div>
);

export default MainContainer;
