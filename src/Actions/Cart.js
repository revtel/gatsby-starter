import {getOutlet} from 'reconnect.js';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtil';

const UserOutlet = getOutlet('user');
const CartOutlet = getOutlet('cart');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCart(item) {
  const nextCart = await req(
    `${Config.apiHost}/cart?token=${UserOutlet.getValue().token}`,
  );
  CartOutlet.update(nextCart);
  return nextCart;
}

async function calcPrice(productId, {qty, variants}) {
  return req(`${Config.apiHost}/cart/item/calc`, {
    method: 'post',
    data: {
      product: productId,
      config: {
        qty,
        variants,
      },
    },
  });
}

async function addToCart(productId, {qty, variants}) {
  const nextCart = await req(
    `${Config.apiHost}/cart/item/add?token=${UserOutlet.getValue().token}`,
    {
      method: 'post',
      data: {
        product: productId,
        config: {
          qty,
          variants,
        },
      },
    },
  );
  CartOutlet.update(nextCart);
  return nextCart;
}

async function removeFromCart(index) {
  const nextCart = await req(
    `${Config.apiHost}/cart/item/delete?token=${UserOutlet.getValue().token}`,
    {
      method: 'post',
      data: {index},
    },
  );
  CartOutlet.update(nextCart);
  return nextCart;
}

async function editConfig(nextConfig) {
  const currConfig = CartOutlet.getValue();
  const nextCart = await req(
    `${Config.apiHost}/cart/item/edit_config?token=${
      UserOutlet.getValue().token
    }`,
    {
      method: 'post',
      data: {
        buyer_name: currConfig.buyer_name,
        buyer_phone: currConfig.buyer_phone,
        buyer_email: currConfig.buyer_email,
        buyer_zip: currConfig.buyer_zip,
        buyer_city: currConfig.buyer_city,
        buyer_district: currConfig.buyer_district,
        buyer_address: currConfig.buyer_address,
        buyer_tel: currConfig.buyer_tel,
        buyer_tel_ext: currConfig.buyer_tel_text,
        receiver_name: currConfig.receiver_name,
        receiver_phone: currConfig.receiver_phone,
        receiver_email: currConfig.receiver_email,
        receiver_zip: currConfig.receiver_zip,
        receiver_city: currConfig.receiver_city,
        receiver_district: currConfig.receiver_district,
        receiver_address: currConfig.receiver_address,
        receiver_tel: currConfig.receiver_tel,
        receiver_tel_ext: currConfig.receiver_tel_ext,
        order_note: currConfig.order_note,
        ...nextConfig,
      },
    },
  );
  CartOutlet.update(nextCart);
  return nextCart;
}

async function clearCart(itemIdx) {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    items: [],
  };
  CartOutlet.update(nextCartValue);
}

async function checkoutRequest(itemIdx) {
  const resp = await req(
    `${Config.apiHost}/checkout/request?token=${UserOutlet.getValue().token}`,
  );

  const nextCart = await req(
    `${Config.apiHost}/cart?token=${UserOutlet.getValue().token}`,
  );

  CartOutlet.update(nextCart);
  return resp;
}

export {
  fetchCart,
  calcPrice,
  addToCart,
  removeFromCart,
  editConfig,
  checkoutRequest,
};
