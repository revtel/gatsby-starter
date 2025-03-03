import {getOutlet} from 'reconnect.js';
import {navigate as nav} from 'gatsby';
import * as User from 'rev.sdk.js/Actions/User';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as ApiUtil from 'rev.sdk.js/Utils/ApiUtil';
import * as PathUtil from 'rev.sdk.js/Utils/PathUtil';
import NavUrl from 'rev.sdk.js/Utils/NavUrl';
import Config from '../../data.json';
import * as jwt from '../Utils/jwt';
import setLoadingPlugin from './Plugin/setLoading';
import navigatePlugin from './Plugin/navigate';
import clientJStorageFetchPlugin from './Plugin/clientJStorageFetch';
import onAdminFormSubmitPlugin from './Plugin/onAdminFormSubmitPlugin';
import onAfterAdminFormSubmitPlugin from './Plugin/onAfterAdminFormSubmitPlugin';
import gtagPlugin from './Plugin/gtagPlugin';
import fbqPlugin from './Plugin/fbqPlugin';
import onCartLoadedPlugin from './Plugin/onCartLoadedPlugin';
import {gtag as Gtag, fbq as Fbq} from 'rev.sdk.js/Utils/Tracker';
import qs from 'query-string';

/**
 * **************************************************
 * create all plugins before defining default actions
 * **************************************************
 */

const Plugins = {
  setLoading: new setLoadingPlugin('setLoading'),
  navigate: new navigatePlugin('navigate'),
  clientJStorageFetch: new clientJStorageFetchPlugin('clientJStorageFetch'),
  onAdminFormSubmit: new onAdminFormSubmitPlugin('onAdminFormSubmit'),
  onAfterAdminFormSubmit: new onAfterAdminFormSubmitPlugin(
    'onAfterAdminFormSubmit',
  ),
  gtag: new gtagPlugin('gtag'),
  fbq: new fbqPlugin('fbq'),
  onCartLoaded: new onCartLoadedPlugin('onCartLoaded'),
};

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

function setLoading(loading, params) {
  if (Plugins.setLoading.shouldExecute()) {
    return Plugins.setLoading.executeSync();
  }
  const {message = ''} = params || {};
  setTimeout(() => {
    LoadingOutlet.update({loading: loading, message: message});
  }, 0);
}

function gtag(eventType, event, payload) {
  let shouldContinue = true;
  if (Plugins.gtag.shouldExecute()) {
    shouldContinue = Plugins.gtag.executeSync(eventType, event, payload);
  }
  // when true , would trigger the default ga behavior in rev.sdk.js
  return shouldContinue;
}

function fbq(eventType, event, payload) {
  let shouldContinue = true;
  if (Plugins.fbq.shouldExecute()) {
    shouldContinue = Plugins.fbq.executeSync(eventType, event, payload);
  }
  // when true , would trigger the default fbq behavior in rev.sdk.js
  return shouldContinue;
}

async function navigate(nextRoute, options = {}) {
  const {message = '', loading = false, ...rest} = options;
  if (nextRoute instanceof NavUrl) {
    nextRoute = nextRoute.toString();
  }

  if (Plugins.navigate.shouldExecute()) {
    return Plugins.navigate.executeAsync(nextRoute, options);
  }

  const currRoute = PathUtil.normalizedRoute();
  nextRoute = PathUtil.normalizedRoute(nextRoute);
  if (currRoute !== nextRoute) {
    if (options?.loading) {
      LoadingOutlet.update({
        message: options.message,
        loading: options.loading,
      });
      if (typeof options.loading === 'number') {
        setTimeout(() => {
          LoadingOutlet.update(false);
        }, options.loading);
      }
    }
    await nav(nextRoute, rest);
  } else {
    console.log('path not changed, ignore...');
  }
}

function adminCanAccess(user, options = {}) {
  return true;
}

/**
 * **************************************************
 * (client) JStorage powered product fetching APIs
 * **************************************************
 */

async function clientJStorageFetch(collection, {cat, sort, search, q, page}) {
  if (Plugins.clientJStorageFetch.shouldExecute()) {
    return Plugins.clientJStorageFetch.executeAsync(collection, {
      cat,
      sort,
      search,
      q,
      page,
    });
  }

  //"q" can defined custom query by project
  const catQuery = cat ? {labels: {$regex: cat}} : {};
  const searchQuery = search ? {$or: [{searchText: {$regex: search}}]} : {};
  const sortValue = sort ? [sort] : ['-created'];
  const pagingValue = page;
  const extraQueries = {};
  let projection = null;

  if (collection === 'product') {
    extraQueries.public = true;
    if (search) {
      searchQuery['$or'].push({name: {$regex: search}});
    }
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
    pagingValue,
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
    Cart.PAYMENT_SUBTYPE.offline,
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
  const checkoutFormSpec = getDefaultCheckoutFormSpec();

  const defaultUser = {
    buyer_name: cart.buyer_name || UserOutlet.getValue().data.name || '',
    buyer_email: cart.buyer_email || UserOutlet.getValue().data.email || '',
    buyer_phone: cart.buyer_phone || UserOutlet.getValue().data.phone || '',
    buyer_zip: cart.buyer_zip || UserOutlet.getValue().data.zip || '',
    buyer_city: cart.buyer_city || UserOutlet.getValue().data.city || '',
    buyer_district:
      cart.buyer_district || UserOutlet.getValue().data.district || '',
    buyer_address:
      cart.buyer_address || UserOutlet.getValue().data.address || '',
  };

  if (Plugins.onCartLoaded.shouldExecute()) {
    return Plugins.onCartLoaded.executeSync(
      cart,
      checkoutFormSpec,
      defaultUser,
    );
  }

  const updateConfig = {
    ...cart,
    ...defaultUser,
  };

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

async function fetchCustomResources(
  resource,
  {sort, keyword, filter, paging, extraQueries},
) {
  return null;
}

async function onLoginResult(err, result) {
  if (!err) {
    try {
      setLoading(true);
      const isAdmin = result.grp.split(':').indexOf('admin') !== -1;
      if (!isAdmin) {
        const queryKey = Config.jstoreVersion !== 'v1' ? 'owner' : 'id';
        const profile = await JStorage.fetchOneDocument('user_profile', {
          [queryKey]: UserOutlet.getValue().username,
        });
        const privateProfile = await User.getPrivateProfile();

        UserOutlet.update({
          ...UserOutlet.getValue(),
          data: {
            ...profile,
            email: privateProfile.email,
            points: privateProfile.points,
            provider: privateProfile.provider,
          },
        });
        const decoded = await jwt.decodeToken(UserOutlet.getValue().token);
        Gtag('event', 'login', {
          method: UserOutlet.getValue().data.provider,
        });
        Gtag('set', 'user_id', decoded.sub);
        Gtag('set', 'user_properties', {
          provider: UserOutlet.getValue().data.provider,
          email: UserOutlet.getValue().data.email,
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

async function confirmOfflineOrder(id) {
  await req(
    `${Config.apiHost}/order/offline?token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {
        id: id,
      },
    },
  );
}

async function editUserPrivateProfile(id, points) {
  return await req(
    `${Config.apiHost}/user/points?token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {
        user_id: id,
        points,
      },
    },
  );
}

async function onAdminFormSubmit({
  path,
  collection,
  instance,
  extValues,
  formData,
  primaryKey,
}) {
  if (Plugins.onAdminFormSubmit.shouldExecute()) {
    return await Plugins.onAdminFormSubmit.executeAsync({
      path,
      collection,
      instance,
      extValues,
      formData,
      primaryKey,
    });
  }
  return false;
}

async function onAfterAdminFormSubmit(
  {path, collection, instance, extValues, formData, primaryKey},
  updatedInstance,
) {
  if (Plugins.onAfterAdminFormSubmit.shouldExecute()) {
    return await Plugins.onAfterAdminFormSubmit.executeAsync({
      path,
      collection,
      instance,
      extValues,
      formData,
      primaryKey,
    });
  }

  if (
    path.indexOf('/admin/landing') > -1 ||
    path.indexOf('/admin/product_category') > -1 ||
    path.indexOf('/admin/article_category') > -1
  ) {
    await JStorage.cacheDocuments('site', {}, null, null, null, undefined, {
      key: 'rev-site-cache.json',
    });
  }

  return null;
}

function getReurl({title, description, image, redirectUrl}) {
  return `${Config.apiHost}/misc/reurl?title=${title}&image=${image}${
    description ? `&description=${description}` : ''
  }&redirect_url=${redirectUrl}`;
}

async function selectCVS({logisticsSubType}) {
  window.location.href = `${Config.apiHost}/misc/cvs-map?${qs.stringify({
    logistics_subtype: logisticsSubType,
    redirect_url: `${window.location.origin}${window.location.pathname}`,
  })}`;
}

// @sdk-next
function createCustomOrder({user_id, name, total, description}) {
  return req(
    `${Config.apiHost}/checkout/custom?token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {
        user_id,
        name,
        total,
        description,
        payment_subtype: 'offline',
      },
    },
  );
}

/**
 * **************************************************
 * init all plugins AFTER defining default actions
 * **************************************************
 */
for (const name in Plugins) {
  const plugin = Plugins[name];
  plugin.init();
}

export {
  delay,
  setLoading,
  navigate,
  adminCanAccess,
  clientJStorageFetch,
  fetchCustomResources,
  onLoginResult,
  onAdminFormSubmit,
  onAfterAdminFormSubmit,
  onCartLoaded,
  createLogisticsOrder,
  rebuild,
  getReurl,
  confirmOfflineOrder,
  editUserPrivateProfile,
  createCustomOrder,
  selectCVS,
  gtag,
  fbq,
};
