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

    data.gaId = 'UA-208890632-1'; //TODO: should change
    data.gtagId = 'GTM-TJ5LZNR'; //TODO: should change
  } else {
    // https://pokemon.netlify.app
    data.stage = 'prod';
    data.clientId = 'revtel-puzzlego';
    data.apiHost = 'https://pokemon-store-api.revtel2.com';
    data.authHost = 'https://auth.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage.revtel-api.com/v2';
    data.jstoreVersion = 'v2';
    data.storageHost = 'https://storage.revtel-api.com/v4';
    data.articleEditorHost = 'https://console-prod.netlify.com/article/editor';

    data.gaId = 'UA-208890632-2'; //TODO: should change
    data.gtagId = 'GTM-M8MD9TP'; //TODO: should change
  }

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('done');
}

config();
