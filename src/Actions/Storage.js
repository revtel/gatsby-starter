import {getOutlet} from 'reconnect.js';
import Config from '../../data.json';
import {req} from '../Utils/ApiUtil';

const UserOutlet = getOutlet('user');

async function getUploadUrlFromFile(file, options = {}) {
  const fileKey = file.name.split('.')[0];
  const fileType = file.type;
  const {acl = 'public-read'} = options;
  return await req(
    `${Config.storageHost}/storage/presigned/url?client_id=${
      Config.clientId
    }&token=${UserOutlet.getValue().token}`,
    {
      method: 'POST',
      data: {
        acl,
        'Content-Type': fileType,
        key: `${fileKey}`,
      },
    },
  );
}

async function fetchUploads(data = {}, options = {anonymous: false}) {
  const params = {
    client_id: Config.clientId,
  };

  if (!options.anonymous && UserOutlet.getValue()?.token) {
    params.token = UserOutlet.getValue().token;
  }

  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return await req(`${Config.storageHost}/storage/file/list?${queryString}`, {
    method: 'POST',
    data,
  });
}

export {getUploadUrlFromFile, fetchUploads};
