import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Button, Input, PageHeader} from 'antd';
import qs from 'query-string';
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

function checkAllowNextStep(cart, values) {
  if (checkModified(cart, values)) {
    return false;
  }

  return (
    cart.items.length > 0 &&
    cart.buyer_name &&
    cart.buyer_address &&
    cart.buyer_phone &&
    cart.buyer_email
  );
}

function CheckoutInfo(props) {
  const [cart] = useOutlet('cart');
  const [dimension] = useOutlet('dimension');
  const [values, setValues] = React.useState(getValuesFromCart(cart));

  React.useEffect(() => {
    setValues(getValuesFromCart(cart));
  }, [cart]);

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

  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

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

  function renderCustomSection(sectionId) {
    return AppActions.renderCustomSection({
      route: props.location.pathname,
      sectionId,
      params,
    });
  }

  const isModified = checkModified(cart, values);
  const isAllowNextStep = checkAllowNextStep(cart);

  return (
    <Wrapper mobile={mobile}>
      <LeftSection>
        <PageHeader
          title="返回購物車"
          onBack={() => navigate('/checkout')}
          style={{padding: 0}}
        />

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

        <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
          <Button onClick={updateCartConfig} disabled={!isModified}>
            更新寄送資訊
          </Button>
          <Button onClick={revertChanges} type="text" disabled={!isModified}>
            復原
          </Button>
        </div>

        {renderCustomSection('_A')}
      </LeftSection>

      <Divider />

      <RightSection>
        <Summary>
          <h2>總計</h2>
          <h2 style={{textAlign: 'right'}}>${cart.total}</h2>
          <Button
            size="large"
            type="primary"
            disabled={!isAllowNextStep}
            onClick={() => navigate('/checkout/review')}
            style={{marginTop: 10, width: '100%'}}>
            下一步
          </Button>
        </Summary>
        {renderCustomSection('_B')}
      </RightSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  align-items: ${(props) => (props.mobile ? 'stretch' : 'flex-start')};
`;

const LeftSection = styled.section`
  flex: 1;
`;

const Divider = styled.div`
  flex-basis: 20px;
`;

const RightSection = styled.section`
  min-width: 300px;
`;

const Summary = styled.div`
  border-radius: 8px;
  padding: var(--basePadding);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const InputField = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  & > label {
    margin-right: 10px;
  }
`;

export default CheckoutInfo;
