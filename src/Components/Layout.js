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
    title: 'RevB2B：B2B 採購下單系統 | 忻旅科技',
    descriytion:
      '「RevB2B 採購下單系統」是一個專為企業設計的流程工具，能有效簡化和優化企業間的採購流程。系統全線上化，透過雲端技術讓客戶能輕易選取供應商提供的商品，並能針對不同等級的客戶提供不同報價。客戶更可輕易建立不同需求之選購單，降低採購流程的人為錯誤及溝通失誤。',

    image: 'https://consult.revtel.tech/images/revteltech.jpg',
  },
  /*
  'dashboard-system': {
    title: '客製化後台及雲端資料庫 | 忻旅科技顧問開發服務',
    descriytion:
      '通過顧問服務對業務需求的深入了解，我們可以提供量身定制的後台和雲端資料庫解決方案。相比於傳統的本地資料庫或套裝系統，這可以幫助企業更好地管理其數據和資源，進一步提高生產力和效率。',
    image: 'https://consult.revtel.tech/images/network.jpg',
  },
  'web2-to-web3': {
    title: '區塊鏈整合服務開發 Web2 to Web3 | 忻旅科技顧問開發服務',
    descriytion:
      '結合過往在 Web2 及 Web3 的豐富經驗，能深入了解業務需求，並根據行業特點和發展趨勢提供量身定制的解決方案。',
    image: 'https://consult.revtel.tech/images/bk.jpg',
  },
  */
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
