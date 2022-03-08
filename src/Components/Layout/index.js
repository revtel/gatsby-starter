import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as User from 'rev.sdk.js/Actions/User';
import Config from '../../../data.json';
import AdminLayout from '../AdminLayout';
import {Helmet} from 'react-helmet';
import SiteNavBar from '../SiteNavBar';
import ProfileLayout from '../ProfileLayout';
import SiteFooter from '../SiteFooter';
import CheckoutLayout from '../CheckoutLayout';
import styled from 'styled-components';
import {THEME_COLOR} from '../../constants';
import 'antd/dist/antd.variable.min.css'; // https://ant.design/docs/react/customize-theme-variable
import './Layout.css';
import Values, {
  customize,
  getCssVarsDeclaration,
} from 'rev.sdk.js/Styles/Values';
import {ConfigProvider} from 'antd';

customize({
  colorPrimary: THEME_COLOR,
});

function Layout({children, location}) {
  const [dimension] = useOutlet('dimension');
  const [styleConfig, setStyleConfig] = useOutlet('style');
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const isAdmin = location.pathname.indexOf('admin') !== -1;

    const initialize = async (isAdmin) => {
      try {
        await User.autoLogin({admin: isAdmin});
      } catch (ex) {
        console.log('autoLogin ex', ex);
        User.logout();
      }

      setInitialized(true);
    };

    if (!initialized) {
      initialize(isAdmin);
    }
  }, [location.pathname, initialized]);

  React.useLayoutEffect(() => {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${Config.gaId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', Config.gaId, {debug_mode: true});

    const gtmScriptTag = document.createElement('script');
    gtmScriptTag.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', '${Config.gtmId}');`;

    const gtmNoScriptTag = document.createElement('noscript');
    gtmNoScriptTag.innerHTML = `
                <iframe
            src="https://www.googletagmanager.com/ns.html?id=${Config.gtmId}"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          />
`;

    document.head.appendChild(gtmScriptTag);
    document.body.appendChild(gtmNoScriptTag);
  }, []);

  const onThemeChange = () => {
    let primaryColor = styleConfig.theme === 'dark' ? 'green' : THEME_COLOR;
    customize({
      colorPrimary: primaryColor,
    });
    setStyleConfig({
      theme: styleConfig.theme === 'dark' ? 'light' : 'dark',
    });
    ConfigProvider.config({
      theme: {
        primaryColor: primaryColor,
      },
    });
  };

  if (location.pathname.indexOf('admin') !== -1) {
    return (
      <AdminLayout
        className={styleConfig.theme === 'dark' ? 'dark' : ''}
        location={location}>
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
      <Wrapper
        className={styleConfig.theme === 'dark' ? 'dark' : ''}
        rwd={dimension.rwd}>
        <SiteNavBar location={location} />
        <ProfileLayout style={{flex: 1}} location={location}>
          {children}
        </ProfileLayout>
        <SiteFooter />
      </Wrapper>
    );
  } else if (location.pathname.indexOf('checkout') !== -1) {
    return (
      <Wrapper
        className={styleConfig.theme === 'dark' ? 'dark' : ''}
        rwd={dimension.rwd}>
        <SiteNavBar location={location} />
        <CheckoutLayout style={{flex: 1}} location={location}>
          {children}
        </CheckoutLayout>
        <button onClick={() => onThemeChange()}>
          換 theme({styleConfig.theme})
        </button>
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${Config.gaId}`}
        />
      </Helmet>
      <Wrapper
        className={styleConfig.theme === 'dark' ? 'dark' : ''}
        rwd={dimension.rwd}>
        {hasSiteNavBar && <SiteNavBar bgColor="white" location={location} />}
        <div style={{flex: 1}}>{children}</div>
        <button onClick={() => onThemeChange()}>
          換 theme({styleConfig.theme})
        </button>
        {hasSiteFooter && <SiteFooter />}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${getCssVarsDeclaration()}
  --contentMaxWidth: 1200px;
  --contentMinHeight: 840px;
  --topNavBarHeight: 64px;
  --basePadding: 15px 20px;
  --primaryColor: ${THEME_COLOR};
  --sectionPadding: 50px 100px;
  --sectionMobilePadding: 20px;
  --backgroundColor: #fff;
  overflow-x: hidden;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* transition: background-color 5s ease-in; */
  &.dark {
    --primaryColor: pink;
    --backgroundColor: #444; // export #444 color to sdk
  }

  color: var(--primaryColor);

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
