import {getOutlet} from 'reconnect.js';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtil';
import * as CustomRenderer from '../../custom/renderer';
import * as CustomAdminRenderer from '../../custom/admin-renderer';

const UserOutlet = getOutlet('user');
const LoadingOutlet = getOutlet('loading');
const CartOutlet = getOutlet('cart');
const ApiHookOutlet = getOutlet('ApiUtil');

ApiHookOutlet.update({
  ...ApiHookOutlet.getValue(),
  onJson: (url, payload, jsonResp) => {
    // a sample hook, you can do whatever you want here
    return jsonResp;
  },
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setLoading(loading) {
  setTimeout(() => {
    LoadingOutlet.update(loading);
  }, 0);
}

function renderCustomSection(props) {
  return CustomRenderer.renderCustomSection(props);
}

function renderCustomAdminSection(props) {
  return CustomAdminRenderer.renderCustomSection(props);
}

/**
 * **************************************************
 * (client) JStorage powered product fetching APIs
 * **************************************************
 */

async function clientJStorageFetch(collection, {cat, sort, search}) {
  const catQuery = cat ? {labels: {$regex: cat}} : {};
  const searchQuery = search ? {searchText: {$regex: search}} : {};
  const sortValue = sort ? [sort] : ['-created'];
  return await req(
    `${Config.jstoreHost}/document/${collection}/find?client_id=${Config.clientId}`,
    {
      method: 'POST',
      data: {
        query: {
          public: true,
          ...catQuery,
          ...searchQuery,
        },
        sorting: sortValue,
      },
    },
  );
}

async function clientJStorageFetchById(collection, id) {
  return await req(
    `${Config.jstoreHost}/document/${collection}/find-one?client_id=${Config.clientId}`,
    {
      method: 'POST',
      data: {
        query: {
          id,
        },
      },
    },
  );
}

/**
 * **************************************************
 * (client) JStorage powered article fetching APIs
 * **************************************************
 */

async function clientFetchArticles() {
  const resp = await req(
    `${Config.jstoreHost}/document/Article_Default/find?client_id=${Config.clientId}`,
    {
      method: 'POST',
      data: {
        query: {
          label: 'blog',
        },
        paging: {
          offset: 0,
          limit: 100,
        },
        sorting: ['-created'],
      },
    },
  );
  return resp.results;
}

async function clientFetchArticleById(id) {
  return await req(
    `${Config.jstoreHost}/document/Article_Default/find-one?client_id=${Config.clientId}`,
    {
      method: 'POST',
      data: {
        query: {id},
      },
    },
  );
}

/**
 * **************************************************
 * Cart & Checkout APIs
 * **************************************************
 */

async function fetchCart(item) {
  console.log('fetchCart', item);
  await delay(600);
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

/**
 * **************************************************
 * Order APIs
 * **************************************************
 */

async function fetchOrders() {
  await delay(600);
  return [
    {id: 1, name: 'order 1', amount: 300},
    {id: 2, name: 'order 2', amount: 600},
    {id: 3, name: 'order 3', amount: 900},
  ];
}

async function fetchOrderById(id) {
  await delay(600);
  return {id, name: `order ${id}`, amount: 300};
}

/**
 * **************************************************
 * JStorage powered article fetching APIs
 * **************************************************
 */

async function fetchArticles() {
  const resp = await req(
    `${Config.jstoreHost}/document/Article_Default/find?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {
        query: {},
        paging: {
          offset: 0,
          limit: 10,
        },
      },
    },
  );
  // TODO: Resource Component should support JStorage find API feature, such as paging and search
  return resp.results;
}

/**
 * **************************************************
 * Storage APIs
 * **************************************************
 */
async function getUploadUrlFromFile(file, options = {}) {
  const fileKey = file.name.split('.')[0];
  const fileType = file.type;
  const {acl = 'public-read'} = options;
  return await req(
    `https://storage-stg.revtel-api.com/v4/storage/presigned/url?client_id=${
      Config.clientId
    }&token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {
        acl,
        'Content-Type': fileType,
        key: `${fileKey}`,
      },
    },
  );
}

async function fetchAllUploads() {
  return await req(
    `https://storage-stg.revtel-api.com/v4/storage/file/list?client_id=${
      Config.clientId
    }&token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {},
    },
  );
}

/**
 * **************************************************
 * Project Specific APIs
 * **************************************************
 */

async function fetchRecords(queryConfigs = null) {
  await delay(600);
  return [
    {id: '1', name: 'Item 1', price: 100, stock: 10},
    {id: '2', name: 'Item 2', price: 200, stock: 20},
    {id: '3', name: 'Item 3', price: 300, stock: 30},
  ];
}

async function fetchRecordById(id) {
  await delay(600);
  return {
    id: `${id}`,
    name: `Item ${id}`,
    price: 250,
    stock: 25,
  };
}

export {
  delay,
  setLoading,
  renderCustomSection,
  renderCustomAdminSection,
  clientJStorageFetch,
  clientJStorageFetchById,
  clientFetchArticles,
  clientFetchArticleById,
  fetchCart,
  updateCartConfig,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  fetchOrders,
  fetchOrderById,
  fetchArticles,
  getUploadUrlFromFile,
  fetchAllUploads,
  fetchRecords,
  fetchRecordById,
};
