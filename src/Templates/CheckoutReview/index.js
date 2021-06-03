import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Button, Input, PageHeader} from 'antd';
import CartItem from '../../Components/CartItem';
import qs from 'query-string';

function CheckoutInfo(props) {
  const [actions] = useOutlet('actions');
  const [cart] = useOutlet('cart');
  const [dimension] = useOutlet('dimension');

  const getInputProps = (field) => {
    return {
      value: cart.config[field],
      disabled: true,
    };
  };

  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

  function renderCustomSection(sectionId) {
    return actions.renderCustomSection({
      route: props.location.pathname,
      sectionId,
      params,
    });
  }

  function allowNextStep() {
    return (
      cart.items.length > 0 &&
      cart.config.name &&
      cart.config.addr &&
      cart.config.mobile &&
      cart.config.email
    );
  }

  return (
    <Wrapper mobile={mobile}>
      <LeftSection>
        <PageHeader
          title="返回購物車"
          onBack={() => navigate('/checkout/info')}
          style={{padding: 0}}
        />

        <h2>您的商品</h2>

        {cart.items.length === 0 && (
          <div>
            <h3 style={{margin: '10px 0'}}>您目前的購物車為空!</h3>
            <Button onClick={() => navigate('/products')}>馬上選購</Button>
          </div>
        )}

        {cart.items.map((cartItem, idx) => (
          <CartItem item={cartItem} itemIdx={idx} key={idx} disabled={true} />
        ))}

        <h2>寄送資訊</h2>

        <InputField>
          <label>收件人</label>
          <Input {...getInputProps('name')} />
        </InputField>

        <InputField>
          <label>地址</label>
          <Input.TextArea {...getInputProps('addr')} />
        </InputField>

        <InputField>
          <label>行動電話</label>
          <Input {...getInputProps('mobile')} />
        </InputField>

        <InputField>
          <label>電子郵件</label>
          <Input {...getInputProps('email')} />
        </InputField>

        {renderCustomSection('_A')}
      </LeftSection>

      <Divider />

      <RightSection>
        <Summary>
          <h2>總計</h2>
          <h2 style={{textAlign: 'right'}}>${cart.items.length * 1000}</h2>
          <Button
            size="large"
            type="primary"
            disabled={!allowNextStep()}
            style={{marginTop: 10, width: '100%'}}>
            付款
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
