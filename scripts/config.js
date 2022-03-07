const fs = require('fs');

function config() {
  const data = {
    clientId: 'pokemon-store',
    primaryUserType: 'email',
  };

  if (process.env.REV_ENV === 'stg') {
    // https://pokemon-stg.netlify.app
    data.stage = 'stg';
    data.apiHost = 'https://pokemon-store-api-stg.revtel2.com';
    data.authHost = 'https://auth-stg.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage-stg.revtel-api.com/v2';
    data.jstoreVersion = 'v2';
    data.storageHost = 'https://storage-stg.revtel-api.com/v4';
    data.articleEditorHost = 'https://console.revtel2.com/article/editor';
    data.gaId = 'G-1LH69CW4Y1';
    data.gtmId = 'GTM-KCRVXBN';
    data.siteCacheUrl =
      'https://pokemon-store-revtel2-com-stg.s3.ap-northeast-1.amazonaws.com/rev-site-cache.json';
    data.pixelId = 354413086572477;
  } else {
    // https://pokemon.netlify.app
    data.stage = 'prod';
    data.apiHost = 'https://pokemon-store-api.revtel2.com';
    data.authHost = 'https://auth.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage.revtel-api.com/v2';
    data.jstoreVersion = 'v2';
    data.storageHost = 'https://storage.revtel-api.com/v4';
    data.articleEditorHost = 'https://console-prod.netlify.com/article/editor';
    data.gaId = 'G-2324HZCWPM';
    data.gtmId = 'GTM-NJXKB4D';
    data.siteCacheUrl =
      'https://pokemon-store-revtel2-com-prod.s3.ap-northeast-1.amazonaws.com/rev-site-cache.json';
    data.pixelId = 354413086572477;
  }

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('done');
}

config();
