import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Modal, Button, Input, Form} from 'antd';
import {useOutlet} from 'reconnect.js';
import {GooglePlusCircle, FacebookCircle} from '@styled-icons/boxicons-logos';

function LoginModal(props) {
  const [visible, setVisible] = useOutlet('login-modal');
  const [actions] = useOutlet('actions');

  const onFinish = async (values) => {
    const {username, password} = values;

    await actions.setLoading(true);
    try {
      await actions.login({username, password});
    } catch (ex) {
      console.log('EX', ex);
      alert('API failed, login failed');
    } finally {
      setVisible(false);
    }
    await actions.setLoading(false);
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
          <h2>登入</h2>
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

          <Register>
            <p>還沒有帳號？</p>
            <Button
              type="link"
              size="small"
              onClick={async () => {
                try {
                  actions.setLoading(true);
                  navigate('/register/request');
                  await actions.delay(600);
                } finally {
                  setVisible(false);
                  actions.setLoading(false);
                }
              }}>
              立即註冊
            </Button>
          </Register>

          <SocialSignin>
            <p style={{color: 'gray', textAlign: 'center', marginBottom: 8}}>
              或使用以下方法登入
            </p>
            <div className="content">
              <GoogleBtn />
              <FacebookBtn />
              <LineBtn />
            </div>
          </SocialSignin>
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
