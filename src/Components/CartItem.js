import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';

function CartItem(props) {
  const [actions] = useOutlet('actions');
  const {item, itemIdx, disabled} = props;

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
      {!disabled && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Button onClick={removeFromCart}>X</Button>
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
