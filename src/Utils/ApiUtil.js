import {getOutlet, hasOutlet} from 'reconnect.js';

const outletName = 'ApiUtil';

async function req(
  url,
  {method = 'GET', headers = {}, data, ...restOptions} = {},
  options = {},
) {
  const {onJson, onError} =
    (hasOutlet(outletName) && getOutlet(outletName).getValue()) || {};
  const {ignoreOnErrorHook} = options;

  const fetchPayload = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(method !== 'GET' && data ? {body: JSON.stringify(data)} : {}),
    ...restOptions,
  };

  const resp = await fetch(url, fetchPayload);

  if (200 <= resp.status && resp.status < 400) {
    try {
      const jsonResp = await resp.json();

      if (typeof onJson === 'function') {
        return onJson(url, fetchPayload, jsonResp);
      } else {
        return jsonResp;
      }
    } catch (ex) {
      // bypass
    }

    // we cannot perform resp.json(), but we still consider it is a success fetch
    // without any payload
    return null;
  }

  if (!ignoreOnErrorHook && typeof onError === 'function') {
    // don't return, so if the hook doesn't throw an exception,
    // the flow will continue to execute
    onError(url, fetchPayload, resp);
  }

  const err = {status: resp.status};

  try {
    err.response = await resp.json();
  } catch (ex) {
    // bypass
  }

  throw err;
}

export {req};
