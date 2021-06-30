import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import {useOutlet} from 'reconnect.js';
import {navigate} from 'gatsby';

function ConfirmPage(props) {
  const {token} = queryString.parse(props.location.search);
  const [actions] = useOutlet('actions');
  const [loginResult, setLoginResult] = React.useState(null);

  React.useEffect(() => {
    async function tryLogin() {
      try {
        actions.setLoading(true);
        console.log('tryLogin with token', token);
        await actions.delay(1000);
        const nextRoute = window.localStorage.getItem('nextRoute');
        window.localStorage.removeItem('nextRoute');
        if (nextRoute) {
          navigate(nextRoute);
        } else {
          navigate('/profile');
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
  }, [token, actions]);

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
    max-width: var(--contentMaxWith);
    margin: 40px auto;
    padding: var(--basePadding);
  }
`;

export default ConfirmPage;
