import {getOutlet} from 'reconnect.js';
import jwtDecode from 'jwt-decode';
import Config from '../data.json';
import {req} from './Utils/ApiUtils';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Actions = {};

function initApp() {
  const UserOutlet = getOutlet('user', null, {autoDelete: false});
  const LoadingOutlet = getOutlet('loading', false, {autoDelete: false});

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

  getOutlet('actions', Actions, {autoDelete: false});
  getOutlet('login-modal', false, {autoDelete: false});

  console.log('App initialized');
}

initApp();
