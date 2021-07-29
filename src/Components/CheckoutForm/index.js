import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button, Input} from 'antd';
import * as CartActions from '../../Actions/Cart';
import * as AppActions from '../../AppActions';

function getValuesFromCart(cart) {
  return {
    buyer_name: cart.buyer_name,
    buyer_address: cart.buyer_address,
    buyer_phone: cart.buyer_phone,
    buyer_email: cart.buyer_email,
  };
}

function checkModified(cart, values) {
  for (const field in values) {
    if (cart[field] !== values[field]) {
      return true;
    }
  }
  return false;
}

function CheckoutForm(props) {
  const {disabled = false} = props;
  const [cart] = useOutlet('cart');
  const [values, setValues] = React.useState(getValuesFromCart(cart));

  React.useEffect(() => {
    setValues(getValuesFromCart(cart));
  }, [cart]);

  const getInputProps = (field) => {
    return {
      disabled,
      value: values[field],
      onChange: (e) =>
        setValues({
          ...values,
          [field]: e.target.value,
        }),
    };
  };

  async function updateCartConfig() {
    try {
      AppActions.setLoading(true);
      await CartActions.editConfig(values);
    } finally {
      AppActions.setLoading(false);
    }
  }

  async function revertChanges() {
    setValues(getValuesFromCart(cart));
  }

  const isModified = checkModified(cart, values);

  return (
    <>
      <h2>寄送資訊</h2>

      <InputField>
        <label>收件人</label>
        <Input {...getInputProps('buyer_name')} />
      </InputField>

      <InputField>
        <label>地址</label>
        <Input.TextArea {...getInputProps('buyer_address')} />
      </InputField>

      <InputField>
        <label>行動電話</label>
        <Input {...getInputProps('buyer_phone')} />
      </InputField>

      <InputField>
        <label>電子郵件</label>
        <Input {...getInputProps('buyer_email')} />
      </InputField>

      {!disabled && (
        <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
          <Button onClick={updateCartConfig} disabled={!isModified}>
            更新寄送資訊
          </Button>
          <Button onClick={revertChanges} type="text" disabled={!isModified}>
            復原
          </Button>
        </div>
      )}
    </>
  );
}

const InputField = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  & > label {
    margin-right: 10px;
  }
`;

export default CheckoutForm;
