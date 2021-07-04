import {getOutlet} from 'reconnect.js';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtils';

const UserOutlet = getOutlet('user');

async function fetchDocuments(
  collection,
  query = {},
  sorting = [],
  paging = {offset: 0, limit: 100},
) {
  return await req(
    `${Config.jstoreHost}/document/${collection}/find?token=${
      UserOutlet.getValue().token
    }`,
    {
      method: 'POST',
      data: {query, sorting, paging},
    },
  );
}

async function fetchOneDocument(collection, query = {}) {
  return await req(
    `${Config.jstoreHost}/document/${collection}/find-one?token=${
      UserOutlet.getValue().token
    }`,
    {
      method: 'POST',
      data: {query},
    },
  );
}

async function createDocument(collection, data) {
  return await req(
    `${Config.jstoreHost}/document/${collection}/create?token=${
      UserOutlet.getValue().token
    }`,
    {
      method: 'POST',
      data: {data},
    },
  );
}

async function updateDocument(collection, query, data) {
  return await req(
    `${Config.jstoreHost}/document/${collection}/update?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {query, data},
    },
  );
}

async function bulkWriteDocuments(collection, operations) {
  return await req(
    `${Config.jstoreHost}/document/${collection}/bulk-write?token=${
      getOutlet('user').getValue().token
    }`,
    {
      method: 'POST',
      data: {actions: operations},
    },
  );
}

export {
  fetchDocuments,
  fetchOneDocument,
  createDocument,
  updateDocument,
  bulkWriteDocuments,
}
