async function req(
  url,
  {method = 'GET', headers = {}, data, ...restOptions} = {},
) {
  const resp = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(method !== 'GET' && data ? {body: JSON.stringify(data)} : {}),
    ...restOptions,
  });

  if (200 <= resp.status && resp.status < 400) {
    try {
      return await resp.json();
    } catch (ex) {
      // bypass
    }
    return null;
  }

  const err = {status: resp.status};

  try {
    err.response = await resp.json();
  } catch (ex) {
    // bypass
  }

  throw err;
}

// TODO: show warn or alert based on env configurations
function onApiError(ex) {
  console.warn(ex);
  const errMsg = `API Fail: ${JSON.stringify(ex, null, 2)}`;
  console.warn(errMsg);
  alert(errMsg);
}

export {req, onApiError};
