import React from 'react';
import styled from 'styled-components';
import {Button, Input, Form} from 'antd';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import queryString from 'query-string';

function ConfirmPage(props) {
  const showLoginModal = useOutletSetter('login-modal');
  const [actions] = useOutlet('actions');
  const [requestResult, setRequestResult] = React.useState(null);
  const {access_token} = queryString.parse(props.location.search);

  const onFinish = async (values) => {
    const {password1, password2} = values;

    if (password1 !== password2) {
      alert('密碼不相符, 請重新輸入');
      return;
    }

    try {
      await actions.setLoading(true);
      await actions.registerConfirm({password: password1, access_token});
      setRequestResult(true);
    } catch (ex) {
      console.log('EX', ex);
      setRequestResult(false);
    } finally {
      await actions.setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const disableInput = requestResult === true;

  return (
    <Wrapper>
      <div className="content">
        <h2 style={{marginBottom: 10}}>完成註冊流程</h2>

        {requestResult === true && (
          <div
            style={{
              padding: 15,
              borderRadius: 6,
              backgroundColor: '#eee',
              marginBottom: 15,
            }}>
            <h3 style={{marginBottom: 10}}>成功</h3>
            <p style={{marginBottom: 15}}>
              您的帳戶已經建立, 現在可以用新密碼重新登入摟!
            </p>
            <Button onClick={() => showLoginModal(true)}>登入</Button>
          </div>
        )}

        {requestResult === false && (
          <div
            style={{
              padding: 15,
              borderRadius: 6,
              backgroundColor: '#eee',
              marginBottom: 15,
            }}>
            <h3 style={{marginBottom: 10}}>失敗</h3>
            <p>請求失敗, 請重新嘗試一次</p>
          </div>
        )}

        {requestResult !== true && (
          <Form
            layout="vertical"
            name="register"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="密碼"
              name="password1"
              rules={[
                {
                  required: true,
                  message: '請輸入密碼!',
                },
              ]}>
              <Input.Password disabled={disableInput} />
            </Form.Item>

            <Form.Item
              label="再次輸入密碼"
              name="password2"
              rules={[
                {
                  required: true,
                  message: '請再次輸入密碼!',
                },
              ]}>
              <Input.Password disabled={disableInput} />
            </Form.Item>

            <Form.Item style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">
                送出
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: 600px;
    margin: 20px auto;
    padding: var(--basePadding);
  }
`;

export default ConfirmPage;
