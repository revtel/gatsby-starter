import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import 'antd/dist/antd.less';
import './Layout.css';
import AdminLayout from './AdminLayout';
import ProfileLayout from './ProfileLayout';
import CheckoutLayout from './CheckoutLayout';
import SiteNavBar from './SiteNavBar';

function Layout({children, location}) {
  if (location.pathname.indexOf('admin') > -1) {
    return <AdminLayout location={location}>{children}</AdminLayout>;
  } else if (location.pathname.indexOf('profile') > -1) {
    return (
      <Wrapper>
        <SiteNavBar location={location} />
        <ProfileLayout location={location}>{children}</ProfileLayout>
      </Wrapper>
    );
  } else if (location.pathname.indexOf('checkout') > -1) {
    return (
      <Wrapper>
        <SiteNavBar location={location} />
        <CheckoutLayout location={location}>{children}</CheckoutLayout>
      </Wrapper>
    );
  }

  let hasSiteNavBar = true;
  if (location.pathname.indexOf('/promo') === 0) {
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
        {hasSiteNavBar && <SiteNavBar location={location} />}
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
