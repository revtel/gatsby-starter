import {getOutlet} from 'reconnect.js';

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

  Actions.autoLogin = async () => {
    if (typeof window !== undefined) {
      const token = window.localStorage.getItem('token');
      if (token) {
        await delay(600);
        UserOutlet.update({username: 'admin', token});
        return true;
      }
    }
    return false;
  };

  Actions.login = async ({username, password}) => {
    await delay(600);
    UserOutlet.update({username, token: '3939889'});
    if (typeof window !== undefined) {
      window.localStorage.setItem('token', '3939889');
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
