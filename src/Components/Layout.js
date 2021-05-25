import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import 'antd/dist/antd.less';
import './Layout.css';
import DashboardLayout from './DashboardLayout';

function Layout({children, location}) {
  if (location.pathname.indexOf('dashboard') > -1) {
    return <DashboardLayout location={location}>{children}</DashboardLayout>;
  }

  return (
    <>
      <Helmet>
        <title>RevtelSite</title>
      </Helmet>
      <Wrapper>{children}</Wrapper>
    </>
  );
}

const Wrapper = styled.div``;

export default Layout;
