function checkAllowNextStep(step, cart) {
  return (
    cart.items.length > 0 &&
    cart.payment_subtype &&
    cart.logistics_type &&
    cart.buyer_name &&
    cart.buyer_phone &&
    cart.buyer_email &&
    cart.buyer_zip &&
    cart.buyer_city &&
    cart.buyer_district &&
    cart.buyer_address &&
    cart.buyer_tel &&
    cart.buyer_tel_ext &&
    cart.receiver_name &&
    cart.receiver_phone &&
    cart.receiver_email &&
    cart.receiver_zip &&
    cart.receiver_city &&
    cart.receiver_district &&
    cart.receiver_address &&
    cart.receiver_tel &&
    cart.receiver_tel_ext
  );
}

export {checkAllowNextStep};
