import React, {useEffect} from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import {useOutlet} from 'reconnect.js';
import {navigate} from 'gatsby';
import Gtag from 'rev.sdk.js/Utils/Gtag';
import NavUrl from 'rev.sdk.js/Utils/NavUrl';

function SocialLoginPage(props) {
  const {
    refresh_token,
    is_registered = 'false',
    provider = '',
  } = queryString.parse(props.location.search);
  const [actions] = useOutlet('actions');
  const [loginResult, setLoginResult] = React.useState(null);

  React.useEffect(() => {
    async function tryLogin() {
      try {
        actions.setLoading(true);
        if (is_registered === 'true') {
          Gtag('event', 'sign_up', {
            method: provider,
          });
          const params = queryString.parse(window.location.search);
          delete params.is_registered;
          delete params.provider;
          actions.navigate(new NavUrl(`${window.location.pathname}`, params), {
            loading: false,
            replace: true,
          });
          return;
        }
        await actions.autoLogin({refresh: refresh_token});
        const nextRoute = window.localStorage.getItem('nextRoute');
        window.localStorage.removeItem('nextRoute');
        if (nextRoute) {
          await navigate(nextRoute);
        } else {
          await navigate('/profile');
        }
        setLoginResult(true);
      } catch (ex) {
        console.warn(ex);
        setLoginResult(false);
      } finally {
        actions.setLoading(false);
      }
    }

    tryLogin();
  }, [refresh_token, actions, is_registered, provider]);

  return (
    <Wrapper>
      <div className="content">
        {loginResult === null && <h2 style={{textAlign: 'center'}}>認證中</h2>}
        {loginResult === true && (
          <>
            <h2 style={{textAlign: 'center'}}>認證成功</h2>
            <p style={{textAlign: 'center', color: 'gray'}}>
              跳轉中, 請稍候...
            </p>
          </>
        )}
        {loginResult === false && (
          <>
            <h2 style={{textAlign: 'center'}}>認證失敗</h2>
            <p style={{textAlign: 'center', color: 'gray'}}>
              請重新嘗試或與我們聯絡
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWidth);
    margin: 40px auto;
    padding: var(--basePadding);
  }
`;

export default SocialLoginPage;
