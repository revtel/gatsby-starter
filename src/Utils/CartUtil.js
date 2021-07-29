function checkAllowNextStep(step, cart) {
  return (
    cart.items.length > 0 &&
    cart.buyer_name &&
    cart.buyer_address &&
    cart.buyer_phone &&
    cart.buyer_email
  );
}

export {checkAllowNextStep};
