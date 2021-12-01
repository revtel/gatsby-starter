import {getOutlet} from 'reconnect.js';
import {navigate as nav} from 'gatsby';
import * as User from 'rev.sdk.js/Actions/User';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as ApiUtil from 'rev.sdk.js/Utils/ApiUtil';
import * as PathUtil from 'rev.sdk.js/Utils/PathUtil';

import * as CustomRenderer from '../../custom/renderer';
import * as CustomAdminRenderer from '../../custom/admin-renderer';
import Config from '../../data.json';
import * as _ from 'lodash';

const req = ApiUtil.req;
const LoadingOutlet = getOutlet('loading');
const ApiHookOutlet = getOutlet('ApiUtil');
const UserOutlet = getOutlet('user');

ApiHookOutlet.update({
  ...ApiHookOutlet.getValue(),
  onJson: (url, payload, jsonResp) => {
    // a sample hook, you can do whatever you want here
    return jsonResp;
  },
  onError: async (url, payload, resp) => {
    if (url.indexOf('token=') > -1 && resp.status === 410) {
      console.log('onError try autoLogin');
      const user = UserOutlet.getValue();
      const isAdmin = user.grp.split(':').indexOf('admin') !== -1;
      const result = await User.autoLogin({admin: isAdmin});
      if (result) {
        console.log('onError autoLogin success, fetch resource again', result);
        return req(url, payload, {ignoreOnErrorHook: true});
      }
      console.log('onError autoLogin failure, throw original error', result);
      throw resp;
    }
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

function navigate(nextRoute, options = {loading: false}) {
  const currRoute = PathUtil.normalizedRoute();
  nextRoute = PathUtil.normalizedRoute(nextRoute);
  if (currRoute !== nextRoute) {
    if (options?.loading) {
      LoadingOutlet.update(true);
      if (typeof options.loading === 'number') {
        setTimeout(() => {
          LoadingOutlet.update(false);
        }, options.loading);
      }
    }
    nav(nextRoute);
  } else {
    console.log('path not changed, ignore...');
  }
}

function renderCustomSection(props) {
  return CustomRenderer.renderCustomSection(props);
}

function renderCustomAdminSection(props) {
  return CustomAdminRenderer.renderCustomSection(props);
}

function renderCustomAdminCol(props) {
  return CustomAdminRenderer.renderCustomCol(props);
}

function renderCustomComponent(props) {
  return CustomRenderer.renderCustomComponent(props);
}

/**
 * **************************************************
 * (client) JStorage powered product fetching APIs
 * **************************************************
 */

async function clientJStorageFetch(collection, {cat, sort, search, q}) {
  //"q" can defined custom query by project
  const catQuery = cat ? {labels: {$regex: cat}} : {};
  const searchQuery = search ? {searchText: {$regex: search}} : {};
  const sortValue = sort ? [sort] : ['-created'];
  const extraQueries = {};
  let projection = null;

  if (collection === 'product') {
    extraQueries.public = true;
  } else if (collection === 'Article_Default') {
    delete catQuery.labels;
    if (!cat) {
      catQuery.label = 'blog';
    } else {
      catQuery.label = {$regex: cat};
    }
    projection = {content: 0};
  }

  const resp = await JStorage.fetchDocuments(
    collection,
    {
      ...catQuery,
      ...searchQuery,
      ...extraQueries,
    },
    sortValue,
    null, // no paging for now, since our EC products shouldn't be too much
    projection, // if we're fetching Article, ignore the content
    {anonymous: true},
  );

  return resp;
}

const getDefaultCheckoutFormSpec = () => ({
  paymentSubTypes: [
    Cart.PAYMENT_SUBTYPE.default,
    Cart.PAYMENT_SUBTYPE.credit,
    Cart.PAYMENT_SUBTYPE.cod,
  ],
  logisticsTypes: [Cart.LOGISTICS_TYPE.cvs, Cart.LOGISTICS_TYPE.home],
  logisticsSubTypes: {
    [Cart.LOGISTICS_TYPE.cvs]: [
      Cart.LOGISTICS_SUBTYPE.famic2c,
      Cart.LOGISTICS_SUBTYPE.hilifec2c,
      Cart.LOGISTICS_SUBTYPE.unimartc2c,
    ],
    [Cart.LOGISTICS_TYPE.home]: [
      Cart.LOGISTICS_SUBTYPE.TCAT,
      Cart.LOGISTICS_SUBTYPE.ECAN,
    ],
  },
  invoiceCategories: [Cart.INVOICE_CATEGORY.b2c, Cart.INVOICE_CATEGORY.b2b],
  invoiceCarrierTypes: [
    Cart.INVOICE_CARRIER_TYPE.none,
    Cart.INVOICE_CARRIER_TYPE.ecpay,
    Cart.INVOICE_CARRIER_TYPE.cdc,
    Cart.INVOICE_CARRIER_TYPE.mobile,
  ],
});

function onCartLoaded(cart) {
  const supportedLogisticsTypes = _.uniq(
    cart.items.reduce((acc, cur) => {
      acc = [
        ...acc,
        ...(cur.product.extra_data.supported_logistics_types || [
          Cart.LOGISTICS_TYPE.home,
        ]),
      ];
      return acc;
    }, []),
  );
  const defaultEmail = UserOutlet.getValue().data.email;

  const checkoutFormSpec = getDefaultCheckoutFormSpec();

  checkoutFormSpec.logisticsTypes = supportedLogisticsTypes;

  let updateConfig = supportedLogisticsTypes.includes(cart.logistics_type)
    ? {}
    : {
        ...cart,
        logistics_type: Cart.LOGISTICS_TYPE.home,
        logistics_subtype: Cart.LOGISTICS_SUBTYPE.TCAT,
      };

  updateConfig = cart.buyer_email
    ? {
        ...updateConfig,
      }
    : {
        ...cart,
        ...updateConfig,
        buyer_email: defaultEmail,
      };

  updateConfig = Object.keys(updateConfig).length <= 0 ? null : updateConfig;

  return {
    updateConfig,
    checkoutFormSpec,
  };
}

// 建立物流訂單 ( 通常會自行建立，此 api 用於意外發生，手動重新建立物流訂單 ）
async function createLogisticsOrder(id) {
  return await req(
    `${Config.apiHost}/order/logistics/create?token=${
      UserOutlet.getValue().token
    }`,
    {
      method: 'post',
      data: {
        id: id,
      },
    },
  );
}

async function rebuild() {
  await req('https://api.netlify.com/build_hooks/615418bee44904a94bd7b4ab', {
    method: 'POST',
    data: {},
  });
}

async function fetchCustomResources(resource, {sort, keyword, filter, paging}) {
  return null;
}

async function onLoginResult(err, result) {
  console.log('onLoginResult', err, result);
  if (!err) {
    try {
      setLoading(true);
      const isAdmin = result.grp.split(':').indexOf('admin') !== -1;
      if (!isAdmin) {
        const queryKey = Config.jstoreVersion !== 'v1' ? 'owner' : 'id';
        const profile = await JStorage.fetchOneDocument('user_profile', {
          [queryKey]: UserOutlet.getValue().username,
        });
        UserOutlet.update({
          ...UserOutlet.getValue(),
          data: {...profile},
        });
        await Cart.fetchCart();
      }
    } catch (ex) {
      console.warn('onLoginResult ex', ex);
    } finally {
      setLoading(false);
    }
  }
}

export {
  delay,
  setLoading,
  navigate,
  renderCustomSection,
  renderCustomAdminSection,
  renderCustomAdminCol,
  renderCustomComponent,
  clientJStorageFetch,
  fetchCustomResources,
  onLoginResult,
  onCartLoaded,
  createLogisticsOrder,
  rebuild,
};
