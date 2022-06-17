import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import {useOutlet} from 'reconnect.js';
import 'antd/dist/antd.less';
import './Layout.css';
import AdminLayout from './AdminLayout';
import ProfileLayout from './ProfileLayout';
import CheckoutLayout from './CheckoutLayout';
import SiteNavBar from './SiteNavBar';
import SiteFooter from './SiteFooter';

function Layout({children, location}) {
  const [dimension] = useOutlet('dimension');

  if (location.pathname.indexOf('admin') > -1) {
    return <AdminLayout location={location}>{children}</AdminLayout>;
  } else if (location.pathname.indexOf('profile') > -1) {
    return (
      <Wrapper rwd={dimension.rwd}>
        <SiteNavBar location={location} />
        <ProfileLayout style={{flex: 1}} location={location}>
          {children}
        </ProfileLayout>
        <SiteFooter />
      </Wrapper>
    );
  } else if (location.pathname.indexOf('checkout') > -1) {
    return (
      <Wrapper rwd={dimension.rwd}>
        <SiteNavBar location={location} />
        <CheckoutLayout style={{flex: 1}} location={location}>
          {children}
        </CheckoutLayout>
        <SiteFooter />
      </Wrapper>
    );
  }

  let hasSiteNavBar = true;
  let hasSiteFooter = true;
  if (location.pathname.indexOf('/promo') === 0) {
    hasSiteNavBar = false;
    hasSiteFooter = false;
  }

  return (
    <>
      <Helmet>
        <title>忻旅科技顧問服務</title>
        <meta
          name="description"
          content="Web2/Web3。系統規劃/系統健檢/技術佈局/商模建議。經驗來自實務/技術實力紮實/自有團隊協作/領域經驗多元"
        />

        <meta property="og:title" content="RevConsult 忻旅科技顧問服務" />
        <meta property="og:site_name" content="RevConsult" />
        <meta property="og:url" content="https://consult.revtel.tech" />
        <meta
          property="og:description"
          content="Web2 / Web3。系統規劃 / 系統健檢 / 技術佈局 / 商模建議。經驗來自實務 / 技術實力紮實 / 自有團隊協作 / 領域經驗多元"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://consult.revtel.tech/images/revteltech.jpg"
        />

        <meta name="author" content="RevtelTech 忻旅科技股份有限公司" />
      </Helmet>
      <Wrapper rwd={dimension.rwd}>
        {hasSiteNavBar && <SiteNavBar bgColor="white" location={location} />}
        <div style={{flex: 1}}>{children}</div>
        {hasSiteFooter && <SiteFooter />}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  --contentMaxWidth: 1920px;
  --contentMinHeight: 600px;
  --topNavBarHeight: 64px;
  --basePadding: 15px 20px;
  --primaryColor: #0eb407;
  --sectionPadding: 50px 100px;
  --sectionMobilePadding: 20px;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .title {
    font-size: ${(props) => (props.rwd === 'desktop' ? 22 : 15)}px;
    color: var(--primaryColor);
    font-size: 22px;
    letter-spacing: 2px;
    font-weight: bold;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .subtitle {
    color: var(--primaryColor);
    font-size: ${(props) => (props.rwd === 'desktop' ? 13 : 10)}px;
    letter-spacing: 2px;
    font-weight: bold;
  }

  .constrain-content {
    max-width: 900px;
    margin: 0 auto;
  }
  .section-dark {
    padding: ${(props) =>
      props.rwd === 'desktop'
        ? 'var(--sectionPadding)'
        : 'var(--sectionMobilePadding)'};
    background-color: #f9f8f7;
  }

  .section {
    padding: ${(props) =>
      props.rwd === 'desktop'
        ? 'var(--sectionPadding)'
        : 'var(--sectionMobilePadding)'};
  }

  .carousel-wrapper {
    display: flex;
    flex-direction: ${(props) => (props.rwd === 'desktop' ? 'row' : 'column')};
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .content {
    font-size: ${(props) => (props.rwd === 'desktop' ? 14 : 10)}px;
    letter-spacing: 2px;
    line-height: 22px;
    white-space: break-spaces;
    color: #000;
  }

  .centered {
    margin: 0 auto;
    text-align: center;
  }
`;

export default Layout;
