import React from 'react';
import OrderPage from 'rev.sdk.js/Templates/OrderPage';

function OrderList(props) {
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

  return <OrderPage {...props} renderCustomComponent={renderCustomComponent} />;
}

export default OrderList;
