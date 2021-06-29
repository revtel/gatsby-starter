import React from 'react';
import styled from 'styled-components';
import {Modal, Button, Input, Select, Checkbox} from 'antd';
import {useOutlet} from 'reconnect.js';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

const initialValues = {
  name: '',
  gender: 'male',
  mobile: '',
  email: '',
  appDev: false,
  webDev: false,
  erpDev: false,
  ecDev: false,
  iotDev: false,
  mmDev: false,
};

const desiredDev = [
  {field: 'webDev', display: '網頁設計開發'},
  {field: 'appDev', display: 'APP設計開發'},
  {field: 'erpDev', display: '客製化CRM/ERP系統'},
  {field: 'ecDev', display: '客製化電商系統'},
  {field: 'mmDev', display: '客製化影音學習(E-Learning)系統'},
  {field: 'iotDev', display: 'IoT軟硬整合系統'},
];

function isValidInput(type, value) {
  if (!value) {
    return false;
  }

  if (type === 'email') {
    return isEmail(value);
  }

  if (type === 'mobile') {
    return isMobilePhone(value, 'zh-TW');
  }

  return false;
}

const UiState = {
  form: 0,
  thankYou: 1,
};

function ContactModal(props) {
  const [visible, setVisible] = useOutlet('contact-modal');
  const [uiState, setUiState] = React.useState(UiState.form);
  const [values, setValues] = React.useState(initialValues);
  const [actions] = useOutlet('actions');

  React.useEffect(() => {
    if (!visible) {
      setUiState(UiState.form);
      setValues(initialValues);
    }
  }, [visible]);

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

  async function onSubmit() {
    const {name, email, mobile} = values;
    if (!name) {
      alert('煩請您填入您的大名, 感謝!');
      return;
    }

    if (!isValidInput('email', email) && !isValidInput('mobile', mobile)) {
      alert('煩請您至少留下一種有效聯絡方式, 感謝!');
      return;
    }

    try {
      actions.setLoading(true);
      console.log('ContactModal', values);
      setValues(initialValues);
      setUiState(UiState.thankYou);
    } catch (ex) {
      console.log('EX', ex);
    } finally {
      actions.setLoading(false);
    }
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
          {uiState === UiState.form && (
            <>
              <h2>讓我們與您聯絡!</h2>
              <p
                style={{
                  margin: '12px 0px',
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#eee',
                }}>
                請留下一點資訊讓我們更了解您,
                我們的同仁會於最遲48小時內跟您聯絡!
              </p>
              <FieldRow>
                <label>您的大名</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Input {...getInputProps('name')} style={{flex: 1}} />
                  <Select
                    style={{marginLeft: 10, width: 80}}
                    value={values.gender}
                    onChange={(value) => setValues({...values, gender: value})}>
                    <Select.Option value={'male'}>先生</Select.Option>
                    <Select.Option value={'female'}>小姐</Select.Option>
                  </Select>
                </div>
              </FieldRow>

              <FieldRow>
                <label>您的手機</label>
                <Input {...getInputProps('mobile')} type="tel" />
              </FieldRow>

              <FieldRow>
                <label>您的EMAIL</label>
                <Input {...getInputProps('email')} type="email" />
              </FieldRow>

              <FieldRow>
                <label>您感興趣的開發項目</label>
                {desiredDev.map((option) => {
                  return (
                    <div key={option.field}>
                      <Checkbox
                        checked={values[option.field]}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [option.field]: e.target.checked,
                          })
                        }>
                        {option.display}
                      </Checkbox>
                    </div>
                  );
                })}
              </FieldRow>

              <ButtonRow>
                <Button type="primary" onClick={onSubmit}>
                  送出
                </Button>
              </ButtonRow>
            </>
          )}

          {uiState === UiState.thankYou && (
            <>
              <h2>感謝您給我們機會服務!</h2>
              <p
                style={{
                  margin: '12px 0px',
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#eee',
                }}>
                我們的同仁會盡快與您聯絡, 最遲不超過48小時!
              </p>

              <ButtonRow>
                <Button type="primary" onClick={() => setVisible(false)}>
                  關閉
                </Button>
              </ButtonRow>
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
  max-width: 320px;
  margin: 0 auto;
`;

const FieldRow = styled.div`
  margin-bottom: 15px;
  & > label {
    color: #666;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ContactModal;
