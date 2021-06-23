import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Modal, Button, Input, Form} from 'antd';
import {useOutlet} from 'reconnect.js';

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

export default LoginModal;
