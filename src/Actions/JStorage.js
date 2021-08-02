import {getOutlet} from 'reconnect.js';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtil';

const UserOutlet = getOutlet('user');

async function fetchDocuments(
  collection,
  query = {},
  sorting = [],
  paging = {offset: 0, limit: 100},
  projection = null,
  options = {anonymous: false},
) {
  return await req(
    _appendToken(
      `${Config.jstoreHost}/document/${collection}/find`,
      options.anonymous,
    ),
    {
      method: 'POST',
      data: {
        query,
        sorting,
        ...(paging ? {paging} : {}),
        ...(projection ? {projection} : {}),
      },
    },
  );
}

async function fetchOneDocument(
  collection,
  query = {},
  projection = null,
  options = {anonymous: false},
) {
  return await req(
    _appendToken(
      `${Config.jstoreHost}/document/${collection}/find-one`,
      options.anonymous,
    ),
    {
      method: 'POST',
      data: {query},
    },
  );
}

async function createDocument(collection, data) {
  return await req(
    _appendToken(`${Config.jstoreHost}/document/${collection}/create`),
    {
      method: 'POST',
      data: {data},
    },
  );
}

async function updateDocument(collection, query, data) {
  return await req(
    _appendToken(`${Config.jstoreHost}/document/${collection}/update`),
    {
      method: 'POST',
      data: {query, data},
    },
  );
}

async function bulkWriteDocuments(collection, operations) {
  return await req(
    _appendToken(`${Config.jstoreHost}/document/${collection}/bulk-write`),
    {
      method: 'POST',
      data: {actions: operations},
    },
  );
}

/**
 * **************************************************
 * Helpers
 * **************************************************
 */

function _appendToken(url, anonymous) {
  const token = UserOutlet.getValue()?.token;
  let separator = '?';

  // TODO: find better way for this
  if (url.indexOf('?') > -1) {
    separator = '&';
  }

  if (token && !anonymous) {
    return url + `${separator}token=${token}`;
  } else {
    return url + `${separator}client_id=${Config.clientId}`;
  }
}

export {
  fetchDocuments,
  fetchOneDocument,
  createDocument,
  updateDocument,
  bulkWriteDocuments,
};
