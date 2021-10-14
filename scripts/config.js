const fs = require('fs');

function config() {
  const data = {
    clientId: 'revtel-puzzlego',
    primaryUserType: 'email',
  };

  if (process.env.REV_ENV === 'stg') {
    // https://brickgo.netlify.app
    data.stage = 'stg';
    data.apiHost = 'https://puzzlego-api-stg.revtel2.com';
    data.authHost = 'https://auth-stg.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage-stg.revtel-api.com/v2';
    data.jstoreVersion = 'v2';
    data.storageHost = 'https://storage-stg.revtel-api.com/v4';
    data.articleEditorHost = 'https://console.revtel2.com/article/editor';

    data.gaId = 'UA-208890632-1';
    data.gtagId = 'GTM-TJ5LZNR';
  } else {
    // https://www.pinbar.tw
    data.stage = 'prod';
    data.clientId = 'revtel-puzzlego';
    data.apiHost = 'https://puzzlego-api.revtel2.com';
    data.authHost = 'https://auth.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage.revtel-api.com/v2';
    data.jstoreVersion = 'v2';
    data.storageHost = 'https://storage.revtel-api.com/v4';
    data.articleEditorHost = 'https://console-prod.netlify.com/article/editor';

    data.gaId = 'UA-208890632-2';
    data.gtagId = 'GTM-M8MD9TP';
  }

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('done');
}

config();
