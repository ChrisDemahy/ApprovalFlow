import React from 'react';
import ApprovalModal from '../components/ApprovalModal';
import ApprovalList from '../components/ApprovalList';
import AuthorizationList from '../components/AuthorizationList';

const ApprovalsPage = () => {
  return (
    <>
      <ApprovalList />
      <ApprovalModal />
    </>
  );
};
export default ApprovalsPage;
