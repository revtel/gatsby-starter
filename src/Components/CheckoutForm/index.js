import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button, Input} from 'antd';
import * as CartActions from '../../Actions/Cart';
import * as AppActions from '../../AppActions';

function getValuesFromCart(cart) {
  return {
    buyer_name: cart.buyer_name,
    buyer_phone: cart.buyer_phone,
    buyer_email: cart.buyer_email,
    buyer_zip: cart.buyer_zip,
    buyer_city: cart.buyer_city,
    buyer_district: cart.buyer_district,
    buyer_address: cart.buyer_address,
    buyer_tel: cart.buyer_tel,
    buyer_tel_ext: cart.buyer_tel_ext,
    receiver_name: cart.receiver_name,
    receiver_phone: cart.receiver_phone,
    receiver_email: cart.receiver_email,
    receiver_zip: cart.receiver_zip,
    receiver_city: cart.receiver_city,
    receiver_district: cart.receiver_district,
    receiver_address: cart.receiver_address,
    receiver_tel: cart.receiver_tel,
    receiver_tel_ext: cart.receiver_tel_ext,
    payment_subtype: cart.payment_subtype,
    logistics_type: cart.logistics_type,
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
  const {disabled = false, style = {}} = props;
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
    <Wrapper style={style}>
      <h2>結帳資訊</h2>
      <InputField>
        <label>付款方式</label>
        <Input {...getInputProps('payment_subtype')} />
      </InputField>
      <InputField>
        <label>物流方式</label>
        <Input {...getInputProps('logistics_type')} />
      </InputField>

      <h2>買家聯絡資訊</h2>
      <InputField>
        <label>姓名</label>
        <Input {...getInputProps('buyer_name')} />
      </InputField>
      <InputField>
        <label>行動電話</label>
        <Input {...getInputProps('buyer_phone')} />
      </InputField>
      <InputField>
        <label>電子郵件</label>
        <Input {...getInputProps('buyer_email')} />
      </InputField>
      <InputField>
        <label>市話</label>
        <Input {...getInputProps('buyer_tel')} />
      </InputField>
      <InputField>
        <label>市話分機</label>
        <Input {...getInputProps('buyer_tel_ext')} />
      </InputField>

      <h2>買家地址</h2>
      <InputField>
        <label>郵遞區號</label>
        <Input {...getInputProps('buyer_zip')} />
      </InputField>
      <InputField>
        <label>縣市</label>
        <Input {...getInputProps('buyer_city')} />
      </InputField>
      <InputField>
        <label>鄉鎮市區</label>
        <Input {...getInputProps('buyer_district')} />
      </InputField>
      <InputField>
        <label>地址</label>
        <Input {...getInputProps('buyer_address')} />
      </InputField>

      <h2>收件人聯絡資訊</h2>
      <InputField>
        <label>姓名</label>
        <Input {...getInputProps('receiver_name')} />
      </InputField>
      <InputField>
        <label>行動電話</label>
        <Input {...getInputProps('receiver_phone')} />
      </InputField>
      <InputField>
        <label>電子郵件</label>
        <Input {...getInputProps('receiver_email')} />
      </InputField>
      <InputField>
        <label>市話</label>
        <Input {...getInputProps('receiver_tel')} />
      </InputField>
      <InputField>
        <label>市話分機</label>
        <Input {...getInputProps('receiver_tel_ext')} />
      </InputField>

      <h2>收件人地址</h2>
      <InputField>
        <label>郵遞區號</label>
        <Input {...getInputProps('receiver_zip')} />
      </InputField>
      <InputField>
        <label>縣市</label>
        <Input {...getInputProps('receiver_city')} />
      </InputField>
      <InputField>
        <label>鄉鎮市區</label>
        <Input {...getInputProps('receiver_district')} />
      </InputField>
      <InputField>
        <label>地址</label>
        <Input {...getInputProps('receiver_address')} />
      </InputField>

      {!disabled && (
        <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
          <Button onClick={updateCartConfig} disabled={!isModified}>
            更新資訊
          </Button>
          <Button onClick={revertChanges} type="text" disabled={!isModified}>
            復原
          </Button>
        </div>
      )}
    </Wrapper>
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

const Wrapper = styled.div`
  & > h2 {
    margin-top: 30px;
  }

  & > h2:first-child {
    margin-top: 0px;
  }
`;

export default CheckoutForm;
