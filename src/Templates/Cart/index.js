import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';
import qs from 'query-string';
import CartItem from '../../Components/CartItem';
import * as AppActions from '../../AppActions';

function Cart(props) {
  const [cart] = useOutlet('cart');
  const [dimension] = useOutlet('dimension');
  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

  function renderCustomSection(sectionId) {
    return AppActions.renderCustomSection({
      route: props.location.pathname,
      sectionId,
      params,
    });
  }

  return (
    <Wrapper mobile={mobile}>
      <LeftSection>
        <h2>購物車</h2>

        {cart.items.length === 0 && (
          <div>
            <h3 style={{margin: '10px 0'}}>您目前的購物車為空!</h3>
            <Button onClick={() => navigate('/products')}>馬上選購</Button>
          </div>
        )}

        {cart.items.map((cartItem, idx) => (
          <CartItem item={cartItem} itemIdx={idx} key={idx} />
        ))}

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
            disabled={cart.items.length === 0}
            style={{marginTop: 10, width: '100%'}}
            onClick={() => navigate('/checkout/info')}>
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

export default Cart;
