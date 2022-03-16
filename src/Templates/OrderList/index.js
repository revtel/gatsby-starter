import React from 'react';

import OrderPage from 'rev.sdk.js/Templates/OrderPage';
import styled from 'styled-components';

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

  return (
    <Wrapper>
      <OrderPage
        {...props}
        renderCustomComponent={renderCustomComponent}
        enableInvoiceFeature
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export default OrderList;
