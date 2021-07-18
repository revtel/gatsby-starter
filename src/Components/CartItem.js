import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';
import * as CartActions from '../Actions/Cart';
import ProductVariants from './ProductVariants';

function CartItem(props) {
  const [actions] = useOutlet('actions');
  const {item, itemIdx, disabled} = props;

  async function removeFromCart() {
    try {
      actions.setLoading(true);
      await CartActions.removeFromCart(itemIdx);
    } finally {
      actions.setLoading(false);
    }
  }

  return (
    <ItemWrapper>
      <h3>{item.product.name}</h3>
      <div style={{color: 'gray', fontSize: 12, marginBottom: 10}}>
        {item.product.id}
      </div>
      <ProductVariants
        product={item.product}
        config={item.config}
        disabled={true}
        rowStyle={{justifyContent: 'flex-start'}}
      />
      <div style={{fontSize: 20}}>${item.amount}</div>
      {!disabled && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Button style={{display: 'block'}} onClick={removeFromCart}>
            移除
          </Button>
        </div>
      )}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
`;

export default CartItem;
