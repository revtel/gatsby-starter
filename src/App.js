import {getOutlet} from 'reconnect.js';
import jwtDecode from 'jwt-decode';
import Config from '../data.json';
import {req} from './Utils/ApiUtils';
import {buildCatDisplayMap} from './Utils/buildCatDisplayMap';
import * as CustomRenderer from '../custom/renderer';
import * as CustomCategories from '../custom/categories';
import * as CustomSortOptions from '../custom/sortOptions';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Actions = {};

function initApp() {
  const UserOutlet = getOutlet('user', null, {autoDelete: false});
  const LoadingOutlet = getOutlet('loading', null, {autoDelete: false});
  const ActionOutlet = getOutlet('actions', null, {autoDelete: false});
  const LoginModalOutlet = getOutlet('login-modal', null, {autoDelete: false});
  const CategoriesOutlet = getOutlet('categories', null, {autoDelete: false});
  const CategoryDisplayOutlet = getOutlet('categoryDisplayMap', null, {
    autoDelete: false,
  });
  const SortOptionsOutlet = getOutlet('sortOptions', null, {autoDelete: false});

  const categories = CustomCategories.getCategories();
  const categoryDisplayMap = buildCatDisplayMap(categories);
  const sortOptions = CustomSortOptions.getSortOptions();

  LoadingOutlet.update(false);
  LoginModalOutlet.update(false);
  CategoriesOutlet.update(categories);
  CategoryDisplayOutlet.update(categoryDisplayMap);
  SortOptionsOutlet.update(sortOptions);

  Actions.renderCustomSection = (props) => {
    return CustomRenderer.renderCustomSection(props);
  };

  Actions.fetchProducts = async ({cat, sort, search}) => {
    await delay(600);
    return Array.from({length: 24}).map((_, i) => {
      return {
        id: `${cat || ''}_${sort || ''}_${i}`,
        name: `${cat || ''}_${sort || ''}_${i}`,
      };
    });
  };

  Actions.fetchProductById = async (id) => {
    await delay(600);
    return {
      id,
      name: 'product-name',
      title: '產品名稱',
      subtitle: '系列',
      price: 1000,
      description:
        '鋁金屬錶殼身形輕盈，採用 100% 再生航太等級合金材質製成。編織單圈錶環採用再生紗繩與矽膠線編織而成，無錶扣無扣環的延展性設計，配戴超舒適。',
      intro:
        '[INTRO] 鋁金屬錶殼身形輕盈，採用 100% 再生航太等級合金材質製成。編織單圈錶環採用再生紗繩與矽膠線編織而成，無錶扣無扣環的延展性設計，配戴超舒適。',
      spec:
        '[SPEC] 鋁金屬錶殼身形輕盈，採用 100% 再生航太等級合金材質製成。編織單圈錶環採用再生紗繩與矽膠線編織而成，無錶扣無扣環的延展性設計，配戴超舒適。',
      remark:
        '[REMARK] 鋁金屬錶殼身形輕盈，採用 100% 再生航太等級合金材質製成。編織單圈錶環採用再生紗繩與矽膠線編織而成，無錶扣無扣環的延展性設計，配戴超舒適。',
    };
  };

  Actions.fetchRecords = async () => {
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

  Actions.autoLogin = async () => {
    if (typeof window !== undefined) {
      const token = window.localStorage.getItem('token');
      if (token) {
        const resp = await req(
          `${Config.authHost}/management/access?refresh_token=${token}`,
        );

        const decoded = jwtDecode(resp.token);
        UserOutlet.update({username: decoded.sub, ...resp, ...decoded});
        return true;
      }
    }
    return false;
  };

  Actions.login = async ({username, password}) => {
    const resp = await req(`${Config.authHost}/management/sign-in`, {
      method: 'POST',
      data: {username, password},
    });

    const decoded = jwtDecode(resp.token);

    UserOutlet.update({username: decoded.sub, ...resp, ...decoded});
    if (typeof window !== undefined) {
      window.localStorage.setItem('token', resp.refresh_token);
    }
  };

  Actions.logout = async () => {
    await delay(600);
    UserOutlet.update(null);
    if (typeof window !== undefined) {
      window.localStorage.removeItem('token');
    }
  };

  Actions.setLoading = async (loading) => {
    setTimeout(() => {
      LoadingOutlet.update(loading);
    }, 0);
  };

  ActionOutlet.update(Actions);

  console.log('App initialized');
}

initApp();
