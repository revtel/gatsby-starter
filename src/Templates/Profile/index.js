import React, {Fragment, useEffect, useState} from 'react';
import {Spin, Form, Input, Radio, Button, message, Modal, Space} from 'antd';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import * as JStorageActions from 'rev.sdk.js/Actions/JStorage';
import AntdAddressSetForm from 'rev.sdk.js/Components/AntdAddressSetForm';
import numeral from 'numeral';
import {THEME_COLOR} from '../../constants';
import {User} from 'rev.sdk.js';

function ChangeEmailModalContent() {
  const [seconds, setSeconds] = useState(120);
  const [triggered, setTriggered] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [user] = useOutlet('user');

  const handleChangeEmail = async (data) => {
    const {email} = data;
    setTriggered(true);
    await User.resetEmailRequest({email});
  };

  useEffect(() => {
    if (triggered) {
      const _timeoutId = setTimeout(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          setTriggered(false);
          setSeconds(120);
          clearTimeout(_timeoutId);
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [seconds, timeoutId, triggered]);

  return (
    <Form
      initialValues={{
        email: '',
      }}
      onFinish={handleChangeEmail}>
      <Form.Item
        rules={[
          {
            required: true,
            message: '電子郵件為必填',
          },
          {
            pattern:
              '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
            message: '電子郵件格式錯誤',
          },
        ]}
        name="email"
        label="新電子郵件">
        <Input />
      </Form.Item>
      <Form.Item>
        <Space direction="vertical" align="end" style={{width: '100%'}}>
          <Button disabled={triggered} htmlType="submit" type="primary">
            {triggered ? '重寄驗證信' : '寄送驗證信'}
          </Button>
          <div style={{color: THEME_COLOR}}>
            {numeral(parseInt(Math.abs(seconds) / 60, 10)).format('00')}:
            {numeral(seconds % 60).format('00')} 可重新寄送驗證信
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
}

function ChangeEmail(props) {
  const [modalRef, modalElem] = Modal.useModal();

  return (
    <Fragment>
      <Button
        style={{marginLeft: 20}}
        htmlType="button"
        type="primary"
        onClick={() => {
          const modal = modalRef.info({});
          modal.update({
            icon: null,
            maskClosable: true,
            title: <div>請輸入欲更改的電子郵件</div>,
            content: <ChangeEmailModalContent />,
            okButtonProps: {
              style: {
                display: 'none',
              },
            },
          });
        }}>
        更改電子信箱
      </Button>
      {modalElem}
    </Fragment>
  );
}

function ProfilePage(props) {
  const [user] = useOutlet('user');
  const [form] = Form.useForm();
  const [values, setValues] = React.useState({});

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      await JStorageActions.updateDocument(
        'user_profile',
        {
          id: user.data.id,
        },
        values,
      );
      message.success('儲存成功！');
    } catch (ex) {
      message.error(`API error ${ex}`);
    }
  };

  return (
    <Wrapper>
      <h2>個人資訊</h2>
      <div className="container">
        {user.data ? (
          <Form
            name="control-hooks"
            form={form}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{
              ...user.data,
            }}
            onValuesChange={(changedValues, allValues) => {
              setValues({...allValues, ...changedValues});
            }}
            onFinish={onFinish}>
            <Form.Item
              label="姓名"
              name="name"
              rules={[{required: true, message: '請輸入您的姓名'}]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="性別"
              name="gender"
              rules={[{required: true, message: '請選擇您的性別'}]}>
              <Radio.Group>
                <Radio value={true}>先生</Radio>
                <Radio value={false}>小姐</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="手機"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: '請輸入您的手機號碼，共10碼',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="電子信箱"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: '請輸入您的電子信箱',
                },
              ]}>
              <Input disabled />
            </Form.Item>

            <AntdAddressSetForm form={form} />

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
              <Button
                htmlType="button"
                style={{marginRight: 20}}
                onClick={onReset}>
                重設
              </Button>
              <Button htmlType="submit" type="primary">
                儲存
              </Button>
              <ChangeEmail />
            </Form.Item>
          </Form>
        ) : (
          <Spin />
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > .container {
  }
`;

export default ProfilePage;
