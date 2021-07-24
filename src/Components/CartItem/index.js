import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';
import * as CartActions from '../../Actions/Cart';
import ProductVariants from '../ProductVariants';

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
      <ItemCol>
        <div className="header">品項</div>

        <div className="content">
          <h3>{item.product.name}</h3>
          <img
            src={(item.product.images && item.product.images[0]) || ''}
            style={{
              width: 180,
              height: 180,
              objectFit: 'contain',
              backgroundColor: '#eee',
            }}
            alt="product thumbnail"
          />
        </div>
      </ItemCol>

      <ItemCol style={{flex: 1}}>
        <div className="header">規格</div>

        <div className="content">
          <ProductVariants
            product={item.product}
            config={item.config}
            disabled={true}
            rowStyle={{justifyContent: 'flex-start'}}
          />
        </div>
      </ItemCol>

      <ItemCol>
        <div className="header">小計</div>

        <div className="content">
          <div style={{fontSize: 20}}>${item.amount}</div>
        </div>
      </ItemCol>

      <ItemCol>
        <div className="header">動作</div>

        <div className="content">
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
        </div>
      </ItemCol>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
`;

const ItemCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > .header {
    padding: 8px 12px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  & > .content {
    padding: 12px;
  }
`;

export default CartItem;
