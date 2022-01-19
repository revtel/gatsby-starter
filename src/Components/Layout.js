import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import {useOutlet, getOutlet} from 'reconnect.js';
import 'antd/dist/antd.less';
import './Layout.css';
import AdminLayout from './AdminLayout';
import ProfileLayout from './ProfileLayout';
import CheckoutLayout from './CheckoutLayout';
import SiteNavBar from './SiteNavBar';
import SiteFooter from './SiteFooter';
import {THEME_COLOR} from '../constants';

function Layout({children, location}) {
  const [dimension] = useOutlet('dimension');
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const isAdmin = location.pathname.indexOf('admin') !== -1;

    const initialize = async (isAdmin) => {
      try {
        await getOutlet('actions').getValue().autoLogin({admin: isAdmin});
      } catch (ex) {
        console.log('autoLogin ex', ex);
        getOutlet('actions').getValue().logout();
      }

      setInitialized(true);
    };

    if (!initialized) {
      initialize(isAdmin);
    }
  }, [location.pathname, initialized]);

  if (location.pathname.indexOf('admin') !== -1) {
    return (
      <AdminLayout location={location}>
        <Helmet>
          <title>Pokémon Center</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Helmet>
        {children}
      </AdminLayout>
    );
  } else if (location.pathname.indexOf('profile') !== -1) {
    return (
      <Wrapper rwd={dimension.rwd}>
        <SiteNavBar location={location} />
        <ProfileLayout style={{flex: 1}} location={location}>
          {children}
        </ProfileLayout>
        <SiteFooter />
      </Wrapper>
    );
  } else if (location.pathname.indexOf('checkout') !== -1) {
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
        <title>Pokémon Store</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
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
  --contentMaxWidth: 1200px;
  --contentMinHeight: 840px;
  --topNavBarHeight: 64px;
  --basePadding: 15px 20px;
  --primaryColor: ${THEME_COLOR};
  --sectionPadding: 50px 100px;
  --sectionMobilePadding: 20px;
  overflow-x: hidden;

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
