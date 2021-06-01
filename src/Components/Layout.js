import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import 'antd/dist/antd.less';
import './Layout.css';
import AdminLayout from './AdminLayout';
import ProfileLayout from './ProfileLayout';
import SiteNavBar from './SiteNavBar';

function Layout({children, location}) {
  if (location.pathname.indexOf('admin') > -1) {
    return <AdminLayout location={location}>{children}</AdminLayout>;
  }

  if (location.pathname.indexOf('profile') > -1) {
    return (
      <Wrapper>
        <SiteNavBar />
        <ProfileLayout location={location}>{children}</ProfileLayout>
      </Wrapper>
    );
  }

  let hasSiteNavBar = true;
  if (location.pathname === '/') {
    hasSiteNavBar = false;
  }

  return (
    <>
      <Helmet>
        <title>RevtelSite</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Helmet>
      <Wrapper>
        {hasSiteNavBar && <SiteNavBar />}
        {children}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  --contentMaxWith: 1200px;
  --topNavBarHeight: 64px;
  --basePadding: 15px 20px;
`;

export default Layout;
