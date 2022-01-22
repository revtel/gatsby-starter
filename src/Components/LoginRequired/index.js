import React from 'react';
import styled from 'styled-components';
import {getOutlet} from 'reconnect.js';
import {Button, Result, Space} from 'antd';

const LoginRequired = ({admin}) => {
  const loginModal = getOutlet('login-modal');
  return (
    <Wrapper admin={admin}>
      <Result
        icon={<img src="/permission-denied.gif" alt="permission-denied" />}
        title="尚未登入"
        subTitle="此頁面需要登入，方能瀏覽"
        extra={
          <Space direction="vertical">
            <Button
              onClick={() => {
                loginModal.update({admin});
              }}>
              登入
            </Button>
          </Space>
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: ${({admin}) => (admin ? '100vh;' : 'var(--contentMinHeight);')}
  padding-top: var(--topNavBarHeight);
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 150px
  }
`;

export default LoginRequired;
