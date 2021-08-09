const fs = require('fs');

function config() {
  const data = {
    clientId: 'revtel-puzzlego',
  };

  if (process.env.REV_ENV === 'stg') {
    data.stage = 'stg';
    data.apiHost = 'https://puzzlego-api-stg.revtel2.com';
    data.authHost = 'https://auth-stg.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage-stg.revtel-api.com/v1';
    data.storageHost = 'https://storage-stg.revtel-api.com/v4';
    data.articleEditorHost = 'https://console.revtel2.com/article/editor';

    // site tracking
    data.gaId = '';
    data.gtmId = '';
  } else {
    data.stage = 'prod';
    data.apiHost = 'https://puzzlego-api.revtel2.com';
    data.authHost = 'https://auth.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage.revtel-api.com/v1';
    data.storageHost = 'https://storage.revtel-api.com/v4';
    data.articleEditorHost = 'https://console-prod.netlify.com/article/editor';

    // site tracking
    data.gaId = '';
    data.gtmId = '';
  }

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('done');
}

config();
