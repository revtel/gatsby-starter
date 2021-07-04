import {getOutlet} from 'reconnect.js';
import jwtDecode from 'jwt-decode';
import './AppOutlets';
import Config from '../data.json';
import {req} from './Utils/ApiUtils';
import * as CustomRenderer from '../custom/renderer';

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
 * Login APIs
 * **************************************************
 */

Actions.login = async ({username, password}, admin) => {
  const path = admin ? '/user/admin/login' : '/user/login';
  const resp = await req(`${Config.apiHost}${path}`, {
    method: 'POST',
    data: {username, password},
  });

  const decoded = jwtDecode(resp.token);

  if (decoded.aud !== Config.clientId) {
    throw new Error('incorrect clientId');
  }

  UserOutlet.update({username: decoded.sub, ...resp, ...decoded});
  if (typeof window !== undefined) {
    window.localStorage.setItem('token', resp.refresh_token);
  }
};

Actions.autoLogin = async ({refresh} = {}) => {
  if (typeof window !== undefined) {
    const token = refresh || window.localStorage.getItem('token');
    if (token) {
      const resp = await req(
        `${Config.authHost}/management/access?refresh_token=${token}`,
      );

      const decoded = jwtDecode(resp.token);

      if (decoded.aud !== Config.clientId) {
        throw new Error('incorrect clientId');
      }

      UserOutlet.update({username: decoded.sub, ...resp, ...decoded});

      // because we don't get refresh_token from localStorage,
      // so we have to save it explicitly
      if (refresh) {
        window.localStorage.setItem('token', refresh);
      }

      return true;
    }
  }
  return false;
};

Actions.logout = async () => {
  await delay(600);
  UserOutlet.update(null);
  if (typeof window !== undefined) {
    window.localStorage.removeItem('token');
  }
};

Actions.registerRequest = async ({email}) => {
  return req(`${Config.apiHost}/user/register/request`, {
    method: 'POST',
    data: {email},
  });
};

Actions.registerConfirm = async ({password, access_token}) => {
  return req(`${Config.apiHost}/user/register/confirm`, {
    method: 'POST',
    data: {password, access_token},
  });
};

Actions.forgotPasswordRequest = async ({email}) => {
  return req(`${Config.apiHost}/user/forgot-password/request`, {
    method: 'POST',
    data: {email},
  });
};

Actions.forgotPasswordConfirm = async ({new_password, access_token}) => {
  return req(`${Config.apiHost}/user/forgot-password/confirm`, {
    method: 'POST',
    data: {new_password, access_token},
  });
};

Actions.googleRedirect = () => {
  window.location.href = `${Config.apiHost}/google/redirect`;
};

Actions.facebookRedirect = () => {
  window.location.href = `${Config.apiHost}/facebook/redirect`;
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
 * JStorage APIs
 * **************************************************
 */

Actions.fetchDocuments = async (
  collection,
  query = {},
  sorting = [],
  paging = {offset: 0, limit: 100},
) => {
  return await req(
    `${Config.jstoreHost}/document/${collection}/find?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {query, sorting, paging},
    },
  );
};

Actions.fetchOneDocument = async (collection, query = {}) => {
  return await req(
    `${Config.jstoreHost}/document/${collection}/find-one?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {query},
    },
  );
};

Actions.createDocument = async (collection, data) => {
  return await req(
    `${Config.jstoreHost}/document/${collection}/create?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {data},
    },
  );
};

Actions.updateDocument = async (collection, query, data) => {
  return await req(
    `${Config.jstoreHost}/document/${collection}/update?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {query, data},
    },
  );
};

Actions.bulkWriteDocuments = async (collection, operations) => {
  return await req(
    `${Config.jstoreHost}/document/${collection}/bulk-write?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {actions: operations},
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

ActionOutlet.update(Actions);
console.log('App initialized');
