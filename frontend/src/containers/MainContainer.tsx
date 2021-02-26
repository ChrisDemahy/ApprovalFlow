import React, { useEffect } from 'react';
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
import ApprovalModal from '../components/ApprovalModal';
import { useAuthenticateUser, useGetCurrentUser } from '../shared/api';
import type { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const MainContainer = ({ children }: Props) => {
  const history = useHistory();
  // Logout user if 411
  const { mutation } = useAuthenticateUser();
  useEffect(() => {
    mutation.mutate();
    return () => {
      mutation.reset();
    };
  }, [history]);
  return (
    <ApprovalModal>
      <div>
        <DashboardSidebar />
        <NavBar />
        <div
          style={{ marginTop: '5em', marginLeft: '17em', marginRight: '5em' }}
        >
          {children}
        </div>
      </div>
    </ApprovalModal>
  );
};

export default MainContainer;
