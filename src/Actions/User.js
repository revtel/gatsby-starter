import {getOutlet} from 'reconnect.js';
import jwtDecode from 'jwt-decode';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtil';

const UserOutlet = getOutlet('user');
const ApiHookOutlet = getOutlet('ApiUtil');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

ApiHookOutlet.update({
  ...ApiHookOutlet.getValue(),
  onError: async (url, payload, resp) => {
    if (url.indexOf('token=') > -1 && resp.status === 401) {
      console.log('onError try autoLogin');
      const result = await autoLogin();
      if (result) {
        console.log('onError autoLogin success, fetch resource again', result);
        return req(url, payload, {ignoreOnErrorHook: true});
      }
      console.log('onError autoLogin failure, throw original error', result);
      throw resp;
    }
  },
});

async function login({username, password}, admin) {
  let endpoint = admin
    ? `${Config.apiHost}/user/admin/login`
    : `${Config.apiHost}/user/login`;
  if (admin && Config.management) {
    endpoint = `${Config.authHost}/management/sign-in`;
  }
  const resp = await req(endpoint, {
    method: 'POST',
    // for admin, we always use "username" as the identifier,
    // for normal user, change the "email" according to your project's user identifier
    data: admin ? {username, password} : {email: username, password},
  });

  const decoded = jwtDecode(resp.token);

  if (decoded.aud !== Config.clientId) {
    throw new Error('incorrect clientId');
  }

  UserOutlet.update({username: decoded.sub, ...resp, ...decoded});
  if (typeof window !== undefined) {
    window.localStorage.setItem(
      'token',
      admin && Config.management ? resp.refresh_token : resp.refresh,
    );
  }
}

async function logout() {
  await delay(600);
  UserOutlet.update(null);
  if (typeof window !== undefined) {
    window.localStorage.removeItem('token');
  }
}

async function autoLogin({refresh} = {}) {
  if (typeof window !== undefined) {
    const token = refresh || window.localStorage.getItem('token');
    if (token) {
      const resp = await req(
        `${Config.authHost}/jwt/access?refresh_token=${token}`,
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
}

async function registerRequest({email}) {
  return req(`${Config.apiHost}/user/register/request`, {
    method: 'POST',
    data: {email},
  });
}

async function registerConfirm({password, access_token}) {
  return req(`${Config.apiHost}/user/register/confirm`, {
    method: 'POST',
    data: {password, access_token},
  });
}

async function forgotPasswordRequest({username}) {
  return req(`${Config.apiHost}/user/forgot-password/request`, {
    method: 'POST',
    // for normal user, change the "email" according to your project's user identifier
    data: {email: username},
  });
}

async function forgotPasswordConfirm({new_password, access_token}) {
  return req(`${Config.apiHost}/user/forgot-password/confirm`, {
    method: 'POST',
    data: {new_password, access_token},
  });
}

async function resetPassword({org_password, new_password}, admin) {
  const path = admin ? '/user/admin/password/reset' : '/user/password/reset';
  return req(`${Config.apiHost}${path}?token=${UserOutlet.getValue().token}`, {
    method: 'POST',
    data: {org_password, new_password},
  });
}

async function googleRedirect() {
  window.localStorage.setItem('nextRoute', window.location.pathname);
  window.location.href = `${Config.apiHost}/google/redirect`;
}

async function facebookRedirect() {
  window.localStorage.setItem('nextRoute', window.location.pathname);
  window.location.href = `${Config.apiHost}/facebook/redirect`;
}

export {
  login,
  logout,
  autoLogin,
  registerRequest,
  registerConfirm,
  resetPassword,
  forgotPasswordRequest,
  forgotPasswordConfirm,
  googleRedirect,
  facebookRedirect,
};
