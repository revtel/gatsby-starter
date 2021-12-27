import React from 'react';
import CartPage from 'rev.sdk.js/Templates/CartPage';

function Cart(props) {
  function renderCustomComponent(props) {
    const {name, data} = props;
    if (name === 'CART_CUSTOM_COLUMN') {
      if (data.item.product.labels?.includes('custom')) {
        return <div />;
      } else {
        return null;
      }
    }
    return null;
  }

  return <CartPage {...props} renderCustomComponent={renderCustomComponent} />;
}

export default Cart;
