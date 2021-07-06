import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Button, Input, Form} from 'antd';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import queryString from 'query-string';
import * as AppActions from '../../AppActions';
import * as UserActions from '../../Actions/User';

function RequestPage(props) {
  const [user] = useOutlet('user');
  const showLoginModal = useOutletSetter('login-modal');
  const [requestResult, setRequestResult] = React.useState(null);
  const {access_token} = queryString.parse(props.location.search);

  React.useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  const onFinish = async (values) => {
    const {password1, password2} = values;

    if (!password1) {
      alert('密碼不可為空');
      return;
    }

    if (password1 !== password2) {
      alert('兩次所輸入的密碼不相符');
      return;
    }

    try {
      await AppActions.setLoading(true);
      await UserActions.forgotPasswordConfirm({
        new_password: password1,
        access_token,
      });
      setRequestResult(true);
    } catch (ex) {
      console.log('EX', ex);
      setRequestResult(false);
    } finally {
      await AppActions.setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const disableInput = requestResult === true;

  return (
    <Wrapper>
      <div className="content">
        <h2 style={{marginBottom: 10}}>重設密碼</h2>

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
              您的密碼已重設, 現在可以用新密碼重新登入摟!
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
              label="新密碼"
              name="password1"
              rules={[
                {
                  required: true,
                  message: '請輸入新密碼!',
                },
              ]}>
              <Input.Password disabled={disableInput} />
            </Form.Item>

            <Form.Item
              label="新密碼再次輸入"
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
                重設密碼
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

export default RequestPage;
