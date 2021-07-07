import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Modal, Button, Input, Form} from 'antd';
import {useOutlet} from 'reconnect.js';
import {GooglePlusCircle, FacebookCircle} from '@styled-icons/boxicons-logos';
import * as AppActions from '../AppActions';
import * as UserActions from '../Actions/User';

function LoginModal(props) {
  const [info, setVisible] = useOutlet('login-modal');
  const visible = !!info;
  let admin = info && info.admin;

  const onFinish = async (values) => {
    const {username, password} = values;

    await AppActions.setLoading(true);
    try {
      await UserActions.login({username, password}, admin);
    } catch (ex) {
      console.log('EX', ex);
      alert('API failed, login failed');
    } finally {
      setVisible(false);
    }
    await AppActions.setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={null}
      footer={null}
      bodyStyle={{padding: 0}}
      width={500}
      visible={visible}
      onOk={() => {
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}>
      <Wrapper>
        <Center>
          <h2>{admin ? 'ADMIN' : ''}登入</h2>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="帳號"
              name="username"
              rules={[
                {
                  required: true,
                  message: '請輸入帳號!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="密碼"
              name="password"
              rules={[
                {
                  required: true,
                  message: '請輸入密碼!',
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">
                登入
              </Button>
            </Form.Item>
          </Form>

          {!admin && (
            <>
              <Register style={{border: 'none', padding: 0}}>
                <div>還沒有帳號？</div>
                <Button
                  type="link"
                  size="small"
                  onClick={async () => {
                    try {
                      AppActions.setLoading(true);
                      navigate('/register/request');
                      await AppActions.delay(600);
                    } finally {
                      setVisible(false);
                      AppActions.setLoading(false);
                    }
                  }}>
                  立即註冊
                </Button>
              </Register>

              <Register>
                <div>忘記您的密碼？</div>
                <Button
                  type="link"
                  size="small"
                  onClick={async () => {
                    try {
                      AppActions.setLoading(true);
                      navigate('/forgot-password/request');
                      await AppActions.delay(600);
                    } finally {
                      setVisible(false);
                      AppActions.setLoading(false);
                    }
                  }}>
                  重新設定
                </Button>
              </Register>

              <SocialSignin>
                <p
                  style={{color: 'gray', textAlign: 'center', marginBottom: 8}}>
                  或使用以下方法登入
                </p>
                <div className="content">
                  <GoogleBtn onClick={() => UserActions.googleRedirect()} />
                  <FacebookBtn onClick={() => UserActions.facebookRedirect()} />
                  <LineBtn />
                </div>
              </SocialSignin>
            </>
          )}
        </Center>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

const Center = styled.div`
  width: 320px;
  margin: 0 auto;
`;

const Register = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SocialSignin = styled.div`
  margin: 10px 0;

  & > .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  }
`;

const GoogleBtn = styled(GooglePlusCircle).attrs({
  size: 60,
  color: '#ea4335',
})`
  margin: 0px 5px;
  cursor: pointer;
`;

const FacebookBtn = styled(FacebookCircle).attrs({
  size: 60,
  color: '#1877f2',
})`
  margin: 0px 5px;
  cursor: pointer;
`;

const LineBtn = styled.img.attrs({
  src: '/images/LINE_logo.png',
})`
  margin-left: 8px;
  position: relative;
  top: 6px;
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
`;

export default LoginModal;
