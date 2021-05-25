import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Modal, Button, Input} from 'antd';
import {useOutlet} from 'reconnect.js';

function LoginModal(props) {
  const [visible, setVisible] = useOutlet('login-modal');
  const [values, setValues] = React.useState({username: '', password: ''});
  const [actions] = useOutlet('actions');

  const getInputProps = (field) => {
    return {
      value: values[field],
      onChange: (e) =>
        setValues({
          ...values,
          [field]: e.target.value,
        }),
    };
  };

  async function onLogin() {
    const {username, password} = values;
    if (!username || !password) {
      alert('must have username and password');
      return;
    }

    await actions.setLoading(true);
    try {
      await actions.login({username, password});
    } catch (ex) {
      console.log('EX', ex);
    } finally {
      setVisible(false);
      setValues({username: '', password: ''});
    }
    await actions.setLoading(false);
  }

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
          <FieldRow>
            <div>帳號</div>
            <Input {...getInputProps('username')} />
          </FieldRow>

          <FieldRow>
            <div>密碼</div>
            <Input {...getInputProps('password')} type="password" />
          </FieldRow>

          <ButtonRow>
            <Button onClick={onLogin}>登入</Button>
          </ButtonRow>
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

const FieldRow = styled.div`
  margin-bottom: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default LoginModal;
