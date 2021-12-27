import React from 'react';
import CheckoutReviewPage from 'rev.sdk.js/Templates/CheckoutReviewPage';

function CheckoutReview(props) {
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
    <CheckoutReviewPage
      enableInvoiceFeature
      renderCustomComponent={renderCustomComponent}
      {...props}
    />
  );
}

export default CheckoutReview;
