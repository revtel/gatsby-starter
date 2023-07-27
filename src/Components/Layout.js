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

const SEO_DATA = {
  '/': {
    title: '忻旅科技顧問服務 | 系統規劃/系統健檢/技術佈局/商模建議',
    descriytion:
      '擅長客製化後台、雲端資料庫及Web2/Web3開發。提供軟體產品全生命週期所需的一站式服務，顧問諮詢(協助技術佈局及產品規劃)、開發協力(助軟體開發及後續維運）及商模合作(協助擴展及增強商業模式)。技術擅長 React、React Native、AWS 及 MongoDB。',

    image: 'https://consult.revtel.tech/images/revteltech.jpg',
  },
  'dashboard-system': {
    title: '客製化後台及雲端資料庫',
    descriytion: '透過客製化後台及雲端資料庫打造強大商業價值',
    image: 'https://consult.revtel.tech/images/network.jpg',
  },
  'web2-to-web3': {
    title: '區塊鏈整合服務開發 Web2 to Web3',
    descriytion: '開啟服務新未來，實現Web2到Web3的無限可能',
    image: 'https://consult.revtel.tech/images/bk.jpg',
  },
};

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

  let isSimple = true;
  if (location.pathname === '/') {
    isSimple = false;
  }

  let seoData = SEO_DATA['/'];
  if (location.pathname.indexOf('dashboard-system') >= 0) {
    seoData = SEO_DATA['dashboard-system'];
  } else if (location.pathname.indexOf('web2-to-web3') >= 0) {
    seoData = SEO_DATA['web2-to-web3'];
  }

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.descriytion} />

        <meta property="og:title" content={seoData.title} />
        <meta property="og:site_name" content="RevConsult 忻旅科技顧問服務" />
        <meta
          property="og:url"
          content={'https://consult.revtel.tech' + location.pathname}
        />
        <meta property="og:description" content={seoData.descriytion} />

        <meta property="og:type" content="website" />
        <meta property="og:image" content={seoData.image} />

        <meta name="author" content="RevtelTech 忻旅科技股份有限公司" />
      </Helmet>
      <Wrapper rwd={dimension.rwd}>
        {hasSiteNavBar && (
          <SiteNavBar bgColor="white" location={location} isSimple={isSimple} />
        )}
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
