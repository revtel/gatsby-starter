import {getOutlet} from 'reconnect.js';
import jwtDecode from 'jwt-decode';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtil';

const UserOutlet = getOutlet('user');
const CartOutlet = getOutlet('cart');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCart(item) {
  return req(`${Config.apiHost}/cart?token=${UserOutlet.getValue().token}`);
}

async function calcPrice(productId, {qty, variants}) {
  return req(
    `${Config.apiHost}/cart/item/calc?token=${UserOutlet.getValue().token}`,
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
}

async function updateCartConfig(cartConfig) {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    config: {
      ...cartValue.config,
      ...cartConfig,
    },
  };
  CartOutlet.update(nextCartValue);
}

async function addItemToCart(item) {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    items: [...cartValue.items],
  };
  nextCartValue.items = [...nextCartValue.items, item];
  CartOutlet.update(nextCartValue);
}

async function removeItemFromCart(itemIdx) {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    items: [...cartValue.items],
  };
  nextCartValue.items.splice(itemIdx, 1);
  CartOutlet.update(nextCartValue);
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

export {fetchCart, calcPrice};
