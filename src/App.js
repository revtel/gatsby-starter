import './AppOutlets';
import {getOutlet} from 'reconnect.js';
import jwtDecode from 'jwt-decode';
import Config from '../data.json';
import {req} from './Utils/ApiUtils';
import * as CustomRenderer from '../custom/renderer';
import * as UserActions from './Actions/User';
import * as JStorageActions from './Actions/JStorage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Actions = {};

const UserOutlet = getOutlet('user');
const LoadingOutlet = getOutlet('loading');
const CartOutlet = getOutlet('cart');
const ActionOutlet = getOutlet('actions');

Actions.delay = delay;

Actions.setLoading = async (loading) => {
  setTimeout(() => {
    LoadingOutlet.update(loading);
  }, 0);
};

Actions.renderCustomSection = (props) => {
  return CustomRenderer.renderCustomSection(props);
};

/**
 * **************************************************
 * (client) JStorage powered product fetching APIs
 * **************************************************
 */

Actions.clientFetchProducts = async ({cat, sort, search}) => {
  const catQuery = cat ? {labels: {$regex: cat}} : {};
  const searchQuery = search ? {searchText: {$regex: search}} : {};
  const sortValue = sort ? [sort] : ['-created'];
  return await req(
    `${Config.jstoreHost}/document/product/find?client_id=${Config.clientId}`,
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
};

Actions.clientFetchProductById = async (id) => {
  return await req(
    `${Config.jstoreHost}/document/product/find-one?client_id=${Config.clientId}`,
    {
      method: 'POST',
      data: {
        query: {
          id,
        },
      },
    },
  );
};

/**
 * **************************************************
 * (client) JStorage powered article fetching APIs
 * **************************************************
 */

Actions.clientFetchArticles = async () => {
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
};

Actions.clientFetchArticleById = async (id) => {
  return await req(
    `${Config.jstoreHost}/document/Article_Default/find-one?client_id=${Config.clientId}`,
    {
      method: 'POST',
      data: {
        query: {id},
      },
    },
  );
};

/**
 * **************************************************
 * Cart & Checkout APIs
 * **************************************************
 */

Actions.fetchCart = async (item) => {
  console.log('fetchCart', item);
  await delay(600);
};

Actions.updateCartConfig = async (cartConfig) => {
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
};

Actions.addItemToCart = async (item) => {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    items: [...cartValue.items],
  };
  nextCartValue.items = [...nextCartValue.items, item];
  CartOutlet.update(nextCartValue);
};

Actions.removeItemFromCart = async (itemIdx) => {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    items: [...cartValue.items],
  };
  nextCartValue.items.splice(itemIdx, 1);
  CartOutlet.update(nextCartValue);
};

Actions.clearCart = async (itemIdx) => {
  await delay(600);
  const cartValue = CartOutlet.getValue();
  const nextCartValue = {
    ...cartValue,
    items: [],
  };
  CartOutlet.update(nextCartValue);
};

/**
 * **************************************************
 * Order APIs
 * **************************************************
 */

Actions.fetchOrders = async () => {
  await delay(600);
  return [
    {id: 1, name: 'order 1', amount: 300},
    {id: 2, name: 'order 2', amount: 600},
    {id: 3, name: 'order 3', amount: 900},
  ];
};

Actions.fetchOrderById = async (id) => {
  await delay(600);
  return {id, name: `order ${id}`, amount: 300};
};

/**
 * **************************************************
 * JStorage powered article fetching APIs
 * **************************************************
 */

Actions.fetchArticles = async () => {
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
};

/**
 * **************************************************
 * Storage APIs
 * **************************************************
 */
Actions.getUploadUrlFromFile = async (file, options = {}) => {
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
};

Actions.fetchAllUploads = async () => {
  return await req(
    `https://storage-stg.revtel-api.com/v4/storage/file/list?client_id=${
      Config.clientId
    }&token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {},
    },
  );
};

/**
 * **************************************************
 * Project Specific APIs
 * **************************************************
 */

Actions.fetchRecords = async (queryConfigs = null) => {
  await delay(600);
  return [
    {id: '1', name: 'Item 1', price: 100, stock: 10},
    {id: '2', name: 'Item 2', price: 200, stock: 20},
    {id: '3', name: 'Item 3', price: 300, stock: 30},
  ];
};

Actions.fetchRecordById = async (id) => {
  await delay(600);
  return {
    id: `${id}`,
    name: `Item ${id}`,
    price: 250,
    stock: 25,
  };
};

ActionOutlet.update({
  ...UserActions,
  ...JStorageActions,
  ...Actions,
});

console.log('App initialized');
