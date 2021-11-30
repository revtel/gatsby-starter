import React from 'react';
import CheckoutReviewPage from 'rev.sdk.js/Templates/CheckoutReviewPage';

function CheckoutReview(props) {
  return <CheckoutReviewPage enableInvoiceFeature {...props} />;
}

export default CheckoutReview;
