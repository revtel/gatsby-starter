import React, {useCallback, useEffect, useState} from 'react';
import queryString from 'query-string';
import JWT from 'jsonwebtoken';
import {useOutlet} from 'reconnect.js';
import styled from 'styled-components';
import {Result} from 'antd';
import loadingIcon from '../../../static/loading.gif';
import failedIcon from '../../../static/permission-denied.gif';
import {User} from 'rev.sdk.js';

const ResetEmailPage = ({location}) => {
  const params = queryString.parse(location.search || {});
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useOutlet('user');
  const [error, setError] = useState(null);

  const _confirm = useCallback(async () => {
    try {
      setLoading(true);
      const emailToken = params.access_token;
      await User.resetEmailConfirm({emailToken});
      const decode = JWT.decode(emailToken);
      const {sub: email} = decode;
      setUser((prev) => ({
        ...prev,
        data: {...prev.data, email: email},
      }));
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [params.access_token, setUser]);

  useEffect(() => {
    if (user) {
      setInitialized(true);
    }
  }, [user]);

  useEffect(() => {
    if (!params.access_token || !initialized) {
      return;
    }
    _confirm();
  }, [_confirm, initialized, params.access_token]);

  if (loading) {
    return (
      <Wrapper>
        <Result
          status="success"
          icon={
            <img
              src={loadingIcon}
              style={{width: 100, height: 100, objectFit: 'contain'}}
              alt=""
            />
          }
          title="驗證中"
          subTitle="請勿中斷畫面或離開"
        />
      </Wrapper>
    );
  }

  if (!loading && error) {
    return (
      <Wrapper>
        <Result
          status="error"
          icon={
            <img
              src={failedIcon}
              style={{width: 100, height: 100, objectFit: 'contain'}}
              alt=""
            />
          }
          title="驗證失敗"
          subTitle="請稍後嘗試，或聯絡客服人員。"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Result
        status="success"
        title="更改信箱成功"
        subTitle="後續請使用新信箱做登入"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);
  align-items: center;
  justify-content: center;
  min-height: 500px;
`;

export default ResetEmailPage;
