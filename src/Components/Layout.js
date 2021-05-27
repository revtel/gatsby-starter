import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import 'antd/dist/antd.less';
import './Layout.css';
import AdminLayout from './AdminLayout';

function Layout({children, location}) {
  if (location.pathname.indexOf('admin') > -1) {
    return <AdminLayout location={location}>{children}</AdminLayout>;
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
      <Wrapper>{children}</Wrapper>
    </>
  );
}

const Wrapper = styled.div``;

export default Layout;
