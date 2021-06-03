import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';
import qs from 'query-string';

function Cart(props) {
  const [actions] = useOutlet('actions');
  const [cart] = useOutlet('cart');
  const [dimension] = useOutlet('dimension');
  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

  function renderCustomSection(sectionId) {
    return actions.renderCustomSection({
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
          <h2 style={{textAlign: 'right'}}>${cart.items.length * 1000}</h2>
          <Button
            size="large"
            type="primary"
            disabled={cart.items.length === 0}
            style={{marginTop: 10, width: '100%'}}>
            結帳
          </Button>
        </Summary>
        {renderCustomSection('_B')}
      </RightSection>
    </Wrapper>
  );
}

function CartItem(props) {
  const [actions] = useOutlet('actions');
  const {item, itemIdx} = props;

  async function removeFromCart() {
    try {
      actions.setLoading(true);
      await actions.removeItemFromCart(itemIdx);
    } finally {
      actions.setLoading(false);
    }
  }

  return (
    <ItemWrapper>
      <h3>
        {item.product.title} [{item.product.id}]
      </h3>
      <p>${item.product.price}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Button onClick={removeFromCart}>X</Button>
      </div>
    </ItemWrapper>
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

const ItemWrapper = styled.div`
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
`;

export default Cart;
