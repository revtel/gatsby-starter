import React from 'react';
import styled from 'styled-components';
import {Modal, Button, Input, Form} from 'antd';
import {useOutlet} from 'reconnect.js';
import * as AppActions from '../AppActions';
import * as UserActions from '../Actions/User';

function ResetPasswordModal(props) {
  const [info, setVisible] = useOutlet('reset-password-modal');
  const visible = !!info;
  let admin = info && info.admin;

  const onFinish = async (values) => {
    const {old_password, new_password, new_password1} = values;

    if (!old_password) {
      alert('不可為空');
      return;
    }

    if (new_password !== new_password1) {
      alert('兩次新密碼輸入不相符');
      return;
    }

    await AppActions.setLoading(true);
    try {
      await UserActions.resetPassword({old_password, new_password}, admin);
    } catch (ex) {
      console.warn('EX', ex);
      alert('API failed');
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
          <h2>{admin ? 'ADMIN' : ''}重設密碼</h2>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="舊密碼"
              name="old_password"
              rules={[
                {
                  required: true,
                  message: '舊密碼不可為空',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="新密碼"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: '新密碼不可為空',
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="重新輸入新密碼"
              name="new_password1"
              rules={[
                {
                  required: true,
                  message: '新密碼不可為空',
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">
                確認重設
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

export default ResetPasswordModal;
